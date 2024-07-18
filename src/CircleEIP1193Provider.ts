import axios, { AxiosInstance } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { encryptEntitySecret } from './utils/helpers';
import { ethers, TransactionRequest, TransactionResponse } from 'ethers';
import CircleSigner from './CircleSigner';

const API_URL = 'https://api.circle.com/v1/w3s';

interface WalletSetResponse {
  data: {
    walletSet: {
      id: string;
      custodyType: string;
      updateDate: Date;
      createDate: Date;
    };
  };
}

interface PublicKeyResponse {
  data: {
    publicKey: string;
  };
}

const CircleToEcosystemBlockchainMap: Map<string, string> = new Map([
  ['ETH-SEPOLIA', 'sepolia'],
  ['MATIC-AMOY', 'amoy']
]);

const EcosystemToCircleBlockchainMap: Map<string, string> = new Map([
  ['sepolia', 'ETH-SEPOLIA'],
  ['amoy', 'MATIC-AMOY']
]);

interface NewWalletResponse {
  data: {
    wallets: Array<{
      id: string;
      address: string;
      blockchain: string;
      createDate: string;
      updateDate: string;
    }>;
  };
}

interface QueryContractResponse {
  data: {
    outputValues: Array<string>;
    outputData: string;
  };
}
class CircleEIP1193Provider {
  private apiKey: string;
  private client: AxiosInstance;
  private publicKey: string | undefined;
  private walletSetId: string | undefined;
  private wallets: Map<string, string>;

  constructor(apiKey: string, publicKey: string = '', walletSetId: string = '', network: string = 'sepolia') {
    super(network);

    this.apiKey = apiKey;
    this.publicKey = publicKey;
    this.walletSetId = walletSetId;

    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    this.wallets = new Map();
  }
  async request(args: { method: string; params?: Array<any> }): Promise<any> {
    switch (args.method) {
      case 'eth_blockNumber':
        // Example: Returning a hardcoded block number as Circle API might not support block fetching
        return 123456;
      case 'eth_sendTransaction':
        return "";
      case 'eth_accounts':
        return Array.from(this.wallets.values());
      // Handle other methods as per your specific Circle API capabilities
      default:
        throw new Error(`Method ${args.method} not supported by Circle API`);
    }
  }

  setPublicKey(publicKey: string): void {
    this.publicKey = publicKey;
  }

  setWalletSetId(walletSetId: string): void {
    this.walletSetId = walletSetId;
  }

  setWallet(wallets: NewWalletResponse): void {
    wallets.data.wallets.forEach( (wallet) => {
      this.wallets.set(wallet.blockchain, wallet.address);
  })
  }

  getSigner(): CircleSigner {
    return new CircleSigner(this)
  }

  getAddress(): string {


    return this.wallets.get(this.getNetwork())
  }

  async fetchPublicKey(): Promise<string | undefined> {
    try {
      const response = await this.client.get<PublicKeyResponse>('/config/entity/publicKey');
      return response.data.data.publicKey;
    } catch (error) {
      console.error('Error fetching public key:', error);
      return undefined;
    }
  }

  async createWalletSet(): Promise<string | undefined> {
    try {
      const data = { entitySecretCiphertext: encryptEntitySecret(this.publicKey!), idempotencyKey: uuidv4(), name: 'Wallet Set A' };
      const response = await this.client.post<WalletSetResponse>('/developer/walletSets', data);
      return response.data.data.walletSet.id;
    } catch (error) {
      console.error('Error creating wallet set:', error);
      return undefined;
    }
  }

  async createWallet(): Promise<NewWalletResponse | undefined> {
  if (!this.walletSetId) {
    throw new Error('Wallet set ID is not defined');
  }
  try {
    const data = {
      idempotencyKey: uuidv4(),
      walletSetId: this.walletSetId,
      accountType: 'SCA',
      blockchains: ['MATIC-AMOY', 'ETH-SEPOLIA'],
      count: 1,
      entitySecretCiphertext: encryptEntitySecret(this.publicKey!)
    };
    const response = await this.client.post<NewWalletResponse>('/developer/wallets', data);
    response.data.wallets.forEach((wallet) => {
      this.wallets.set(wallet.blockchain, wallet.address);
    });
    return response.data;
  } catch (error) {
    console.error('Error creating wallet:', error);
    return undefined;
  }
}

async queryContractState(address: string, blockchain: string, abiFunctionSignature?: string, abiParameters?: Array<string>): Promise<string | undefined> {
  try {
    const data: { address: string; blockchain: string; abiFunctionSignature?: string | null; abiParameters?: Array<string> | null } = {
      address,
      blockchain,
      abiFunctionSignature: abiFunctionSignature || null,
      abiParameters: abiParameters || null
    };
    const response = await this.client.post<QueryContractResponse>('/contracts/query', data);
    console.log(response);
    return response.data.data.outputData;
  } catch (error) {
    console.error('Error querying contract state:', error);
    return undefined;
  }
}

 public static async create(apiKey: string): Promise<CircleEIP1193Provider> {
  const instance = new CircleEIP1193Provider(apiKey);

  try {
    const publicKey = await instance.fetchPublicKey();
    if (!publicKey) {
      throw new Error('Failed to fetch public key');
    }
    instance.publicKey = publicKey;

    const walletSetId = await instance.createWalletSet();
    if (!walletSetId) {
      throw new Error('Failed to get wallet set ID');
    }
    instance.walletSetId = walletSetId;
  } catch (error) {
    console.error('Error creating CircleEIP1193Provider:', error);
    throw error;
  }

  return instance;
}

export default CircleEIP1193Provider;
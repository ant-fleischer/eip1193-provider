import axios, { AxiosInstance } from 'axios';

const API_URL = 'https://api.circle.com/v1/w3s';

class CustomProvider {
  private apiKey: string;
  private entitySecret: string;
  private client: AxiosInstance;

  constructor(apiKey: string, entitySecret: string) {
    this.apiKey = apiKey;
    this.entitySecret = entitySecret;
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },

    });
  }

  async request(args: { method: string, params?: Array<any> }): Promise<any> {
    const { method, params = [] } = args;

    switch (method) {
      case 'eth_requestAccounts':
        return this.handleEthRequestAccounts();
      case 'eth_sendTransaction':
        return this.sendTransaction(params);
      case 'createWallet':
        return this.createMSCAWallet();
      case 'eth_chainId':
        return this.getChainId();
      case 'eth_accounts':
        return this.getAccounts();
      default:
        throw this.createProviderRpcError(`Unsupported method: ${method}`, 4200);
    }
  }

  





  private async createWalletSet(): Promise<string> {
    const response = await this.client.post('developer/walletSet', {
    })
    return response.data.walletSetId;
  }
  private async handleEthRequestAccounts(): Promise<Array<string>> {
    const response = await this.client.post('/wallets/new');
    return [response.data.address];
  }
  async sendTransaction(params: Array<any>): Promise<string> {
    const response = await this.client.post('/transactions/send', params);
    return response.data.transactionHash;
  }
  async createMSCAWallet(): Promise<string> {
    const response = await this.client.post('/developer/wallets', {

    });
    return response.data.address;
  }
  async getChainId(): Promise<string> {
    try {
      const response = await this.client.get('/chain/id');
      return response.data.chainId;
    } catch (error) {
      console.error('Error getting chain ID:', error);
      throw error;
    }
  }
  async getAccounts(): Promise<string[]> {
    try {
      const response = await this.client.get('/accounts');
      return response.data.accounts;
    } catch (error) {
      console.error('Error getting accounts:', error);
      throw error;
    }
  }
  private createProviderRpcError(message: string, code: number): ProviderRpcError {
    const error = new Error(message) as ProviderRpcError;
    error.code = code;
    return error;
  }
}
interface ProviderRpcError extends Error {
  code: number;
  data?: unknown;
}

export default CustomProvider;
import { ethers, Signer, TransactionLike, TransactionRequest, TransactionResponse } from 'ethers';
import CircleEIP1193Provider from './CircleEIP1193Provider';

class CircleSigner implements ethers.Signer {
    provider: CircleEIP1193Provider;
    private address: string; 

    constructor(provider: CircleEIP1193Provider) {
        this.provider = provider;
        this.address = provider.getAddress()
    }

    getAddress(): Promise<string> {
        return Promise.resolve(this.address);
    }

    signMessage(message: string | Uint8Array): Promise<string> {
        throw new Error('Signing messages is not supported by the Circle API');
    }

    signTransaction(transaction: TransactionRequest): Promise<string> {
        throw new Error('Signing messages is not supported by the Circle API');
    }

    getNonce(): Promise<number> {
        throw new Error('Signing messages is not supported by the Circle API');
    }

    populateCall(): Promise<TransactionLike<string>> {
        throw new Error('Signing messages is not supported by the Circle API');
    }

    populateTransaction(): Promise<TransactionLike<string>> {
        throw new Error('Signing messages is not supported by the Circle API');
    }

    estimateGas(): Promise<bigint>{
        throw new Error('Signing messages is not supported by the Circle API');
    }

    call(): Promise<string>{ 
        throw new Error('Signing messages is not supported by the Circle API');
    }

    resolveName(): Promise<string | null> {
        throw new Error('Signing messages is not supported by the Circle API');

    }

    sendTransaction(): Promise<TransactionResponse>{
        throw new Error('Signing messages is not supported by the Circle API');

    }

    signTypedData(): Promise<string>{
        throw new Error('Signing messages is not supported by the Circle API');

    }


    connect(provider: CircleEIP1193Provider): Signer {

        return new CircleSigner(provider);
    }
}

export default CircleSigner;
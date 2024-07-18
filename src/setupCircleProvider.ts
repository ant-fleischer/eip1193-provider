// setupCircleProvider.ts

import CircleEIP1193Provider from './CircleEIP1193Provider';

export async function setupCircleProvider(apiKey: string): Promise<CircleEIP1193Provider> {
  const instance = new CircleEIP1193Provider(apiKey);
  const publicKey = await instance.fetchPublicKey();
  if (!publicKey) {
    throw new Error('Failed to fetch public key');
  }
  instance.setPublicKey(publicKey);

  const walletSetId = await instance.createWalletSet();
  if (!walletSetId) {
    throw new Error('Failed to get wallet set ID');
  }
  instance.setWalletSetId(walletSetId);

  const wallets = await instance.createWallet();
  if (!wallets) {
    throw new Error('Failed to create a new wallet');
  }
  instance.setWallet(wallets)
  
  return instance;
}
import CircleEIP1193Provider from './CircleEIP1193Provider';

export async function setupCircleProvider(apiKey: string): Promise<CircleEIP1193Provider> {
  const circleProvider = new CircleEIP1193Provider(apiKey);

  // Fetch and set the public key
  const publicKey = await circleProvider.getPublicKey();
  if (publicKey) {
      circleProvider.setPublicKey(publicKey);
  } else {
    throw new Error('Unable to fetch the public key');
  }

  // Create and set the wallet set
  const walletSetId = await circleProvider.createWalletSet();
  if (walletSetId) {
    circleProvider.setWalletSetId(walletSetId);
  } else {
    throw new Error('Unable to create the wallet set');
  }

  // Create wallets 
  const wallets = await circleProvider.createWallet();
  if (wallets) {
      circleProvider.setWallet(wallets);
  } else {
    throw new Error('Unable to create wallet');
  }

  return circleProvider;
}
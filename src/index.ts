import { ethers } from 'ethers';
import { config } from './config';
import { setupCircleProvider } from './setupCircleProvider';

async function main() {
  try {
    const circleProvider = await setupCircleProvider(config.apiKey);

    const provider = new ethers.BrowserProvider(circleProvider)
    
    console.log('Provider initialized successfully');

    const walletAddress = 'your-wallet-address'; // The appropriate wallet address from your CircleWallet instance
    const signer = provider.getSigner();
    
  } catch (error) {
    console.error('Error setting up provider or performing transactions:', error);
  }
}

main();
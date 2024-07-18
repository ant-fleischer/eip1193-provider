import { ethers } from 'ethers';
import { setupCircleProvider } from './setupCircleProvider';
import { config } from './config';

const usdcContractAddress = ethers.getAddress('0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238');
const balanceOfAbi = [
  "function balanceOf(address account) view returns (uint256)"
];

async function main() {
  try {
    const circleProvider = await setupCircleProvider(config.apiKey);
    const provider = new ethers.BrowserProvider(circleProvider);

    console.log('Provider initialized successfully');

    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log(`Signer Address: ${address}`);

    const iface = new ethers.Interface(balanceOfAbi);
    const data = iface.encodeFunctionData('balanceOf', [address]);

    const params = [{
      to: usdcContractAddress,
      data: data
    }];

    const result = await provider.send('eth_call', params);

    console.log(result)
  } catch (error) {
    console.error('Error initializing provider:', error);
  }
}

main();
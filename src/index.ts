import CircleEIP1193Provider from './CircleEIP1193Provider';
import { config } from './config';

let provider: CircleEIP1193Provider | undefined;

async function initializeProvider(): Promise<void> {
  try {
    provider = await CircleEIP1193Provider.create(config.apiKey);
    console.log('Provider initialized successfully');
  } catch (error) {
    console.error('Error initializing provider:', error);
  }
}

initializeProvider();

export { provider };
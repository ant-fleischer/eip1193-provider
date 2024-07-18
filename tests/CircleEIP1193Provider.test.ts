import { describe, beforeAll, test, expect } from '@jest/globals';
import CircleEIP1193Provider from '../src/CircleEIP1193Provider';
import { config } from '../src/config';
import { setupCircleProvider } from '../src/setupCircleProvider';

describe('CircleEIP1193Provider', () => {
  let provider: CircleEIP1193Provider;

  beforeAll(async () => {
    provider = await setupCircleProvider(config.apiKey);
  });

  test('publicKey should be a non-null string', async () => {
    const publicKey = await provider.fetchPublicKey();
    console.log('Fetched Public Key:', publicKey);
    expect(publicKey).not.toBeNull();
    expect(typeof publicKey).toBe('string');
  });

  test('wallet set should be non-null UUID string', async () => {
    const walletSetId = await provider.createWalletSet();
    console.log('Created wallet set:', walletSetId);
    expect(walletSetId).not.toBeNull();
    expect(typeof walletSetId).toBe('string');
  });
});
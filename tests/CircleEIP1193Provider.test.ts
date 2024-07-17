import { describe, beforeAll, test, expect } from '@jest/globals';
import CircleEIP1193Provider from '../src/CircleEIP1193Provider';
import { config } from '../src/config';

describe('CircleEIP1193Provider', () => {
  let provider: CircleEIP1193Provider;

  beforeAll(async () => {
    provider = await CircleEIP1193Provider.create(config.apiKey, config.entitySecret);
  });

  test('publicKey should be a non-null string', () => {
    return provider.fetchPublicKey().then(publicKey => {
      console.log('Fetched Public Key:', publicKey);
      expect(publicKey).not.toBeNull();
      expect(typeof publicKey).toBe('string');
    });

  });

  test('wallet set should be non-null UUID string', () => {
    return provider.createWalletSet().then(walletSetId => {
      console.log('Created wallet set:', walletSetId);
      expect(walletSetId).not.toBeNull();
      expect(typeof walletSetId).toBe('string');
    });

  });

  // test('should request accounts', async () => {
  //   const accounts = await provider.request({ method: 'eth_requestAccounts', params: [] });
  //   expect(accounts).toBeInstanceOf(Array);
  //   expect(accounts.length).toBeGreaterThan(0);
  // });

  // test('should send a transaction', async () => {
  //   const transactionParams = [{ /* your transaction params */ }];
  //   const transactionHash = await provider.request({ method: 'eth_sendTransaction', params: transactionParams });
  //   expect(typeof transactionHash).toBe('string');
  // });
});

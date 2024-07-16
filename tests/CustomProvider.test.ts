import { describe, beforeAll, test, expect } from '@jest/globals';
import CustomProvider from '../src/CustomProvider';

describe('CustomProvider', () => {
  let provider: CustomProvider;

  beforeAll(() => {
    provider = new CustomProvider("API_KEY", "ENTITY_SECRET")

  test('should request accounts', async () => {
    const accounts = await provider.request({ method: 'eth_requestAccounts', params: []});
    expect(accounts).toBeInstanceOf(Array);
    expect(accounts.length).toBeGreaterThan(0);
  });

  test('should send a transaction', async () => {
    const transactionParams = [{ /* your transaction params */ }];
    const transactionHash = await provider.request({ method: 'eth_sendTransaction', params: transactionParams });
    expect(typeof transactionHash).toBe('string');
  });
})
}
);
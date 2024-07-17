## Summary
A project to try and build a wrapper to make Circle w3s APIs adhere to [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193). 

## Details
The project defines a CircleEIP1193Provider that abstracts most of the w3s setup steps and allows certain read operations to be called on the selected network. Like other web3 libraries, the network must be selected when instantiating the provider. 

```ts
const provider = new CircleEIP1193Provider("sepolia", "API_KEY");
provider.call({address: "0x", data: ""});
```

The project also defines a CircleWallet, which can be used to create transactions (userOps) and deploy contracts. The CircleWallet can be instantiated by passing an address, upon which the library will check for ownership, or without an address to create a new wallet. The wallet will be created on all available networks, but will only be accessible on the currente network.

```ts
const existingWallet = new circle.Wallet("0x123", provider);
```

```ts
const newWallet = new circle.Wallet(provider);
newWallet.sendTransaction({});
```

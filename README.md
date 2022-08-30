# nft-mint-tool

> [ERC721A](https://github.com/chiru-labs/ERC721A) smart contract build for [Remix-IDE](https://github.com/ethereum/remix-ide) based deployment

## Screencast

![screencast](./docs/screencast.gif)

## Setup guide

1. Run `Remix IDE v0.24.1 with solidity 0.8.7`. This repo [contains a copy](./packages/remix-ide/)

2. Import [workspace with smart contract](./packages/assets/remix-backup-2022-6-19.zip). Deploy to local [Ganache](https://trufflesuite.com/ganache/) or Ethereum testnet and copy contract address.

3. Update [client config](./packages/client/src/config.ts) with contract address. Run the client by executing `npm start`

4. Connect local client to MetaMask with deployer account. Enable mint by running `ioc.contractService._instance.setPaused(false)` or `ioc.contractService.updateWhiteList().then(() => ioc.contractService._instance.setWhitelistMintEnabled(true))` in Chrome Dev Tools on local client instance **(npmstart-ed)**

5. Enjoy)

## Keywords

SOLID, DI, OOP, WEB3, Ethers.js, React, TypeScript

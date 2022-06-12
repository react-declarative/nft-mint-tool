# Notes

> Might be usefull for new developer

## Usage

```bash
npm start # create genesis block, set coinbase and start miner
npm run http # Enable http-rpc on http://localhost:8545/ (MetaMask onboarding)
npm run attach # Run Geth JavaScript Console
```

## Enviroment

**Geth version:** 1.10.17-stable

## Snippets

Access `geth` repl

```bash
npm run attach
```

REPL commands

```tsx
personal.unlockAccount(eth.coinbase) // Qwerty123 in password.txt
web3.fromWei(eth.getBalance(eth.coinbase), 'ether')
```

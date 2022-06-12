#!/usr/bin/env bash

# create new genesis block
rm -rf ./chaindata
geth init ./config/genesis.json --datadir chaindata

# create coinbase account for miner
geth --datadir=./chaindata --password ./config/password.txt account new

# enable rpc on http://localhost:8545 after 10 seconds (optional remix support)
sleep 10 && geth attach ./chaindata/geth.ipc --exec "admin.startHTTP(\"0.0.0.0\", 8545, \"https://remix.ethereum.org\")" &

# run geth instance and start mining
geth --datadir=./chaindata --nodiscover --unlock 0 --password ./config/password.txt --mine --miner.threads 1 --miner.etherbase 0

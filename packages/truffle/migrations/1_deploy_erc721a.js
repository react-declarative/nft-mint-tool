const path = require("path");
const BN = require('bn.js');

const readFile = require("../utils/readFile");
const writeFile = require("../utils/writeFile");

const ContractInstance = artifacts.require("YourNftToken");

const CONFIG_PATH = "../../client/src/contract/erc721a.deployed.json";

const PARAMS = {
  tokenName: "PAHOM",
  tokenSymbol: "UFF",
  cost: new BN(777).mul(new BN(Math.pow(10, 12))),
  maxSupply: 777777,
  maxMintAmountPerTx: 777,
  hiddenMetadataUri: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Saturn.png',
  baseUri: 'https://upload.wikimedia.org/wikipedia/commons/2/28/'
}

module.exports = async (deployer) => {
  const fullPath = path.resolve(__dirname, CONFIG_PATH);
  await deployer.deploy(ContractInstance, ...Object.values(PARAMS));
  const currentConfig = await readFile(fullPath);
  currentConfig["erc721a"] = ContractInstance.address;
  await writeFile(fullPath, currentConfig);
};

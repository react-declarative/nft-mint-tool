import CC_WHITELIST from './contract/erc721a.whitelist.json';
import CC_CONTRACT_ABI from "./contract/erc721a.abi.json";
import CC_DEPLOY from "./contract/erc721a.deployed.json"

export const CC_WHITELIST_ADDRESSES = CC_WHITELIST;

export const CC_CONTRACT_ADDRESS = CC_DEPLOY.erc721a;

export const CC_APP_NAME = "HashChess";

export const CC_MAX_AMOUNT_DIGITS = 3;

export const CC_TOKEN_TYPE = 'ERC20';
export const CC_TOKEN_DECIMALS = 0;
export const CC_TOKEN_ICON = process.env.REACT_APP_ICON || 'http://placekitten.com/200/300';

export const CC_ETHERSCAN_URL = `https://etherscan.io/address/${CC_CONTRACT_ADDRESS}`;

export { CC_CONTRACT_ABI };

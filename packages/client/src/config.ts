export const CC_WHITELIST_ADDRESSES = process.env.REACT_APP_WHITELIST?.split(',') || [
    "0x45f328DFa26Fa5Efdbb2180C33B50976184B8115",
    "0x94CA0F3b2648580B77D65D07dB5e5df6f6F6Ce11",
];

export const CC_CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT || '0x1D09B4674b2D2FE7E8bbf2dAA7e3F1382B95Cd12';

export const CC_TOKEN_TYPE = 'ERC20';
export const CC_TOKEN_DECIMALS = 0;
export const CC_TOKEN_ICON = process.env.REACT_APP_ICON || 'http://placekitten.com/200/300';

export const CC_ETHERSCAN_URL = `https://etherscan.io/address/${CC_CONTRACT_ADDRESS}`;

export { default as CC_CONTRACT_ABI } from "./contract/ABI.json";

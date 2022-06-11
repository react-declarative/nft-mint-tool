import { inject } from 'react-declarative';

import ContractService from "./base/ContractService";
import MerkleTreeService from "./base/MerkleTreeService";
import EthersService from "./base/EthersService";
import AlertService from "./base/AlertService";
import RouterService from './base/RouterService';
import AssetService from './base/AssetService';

import ConnectPageService from './view/ConnectPageService';
import MintPageService from './view/MintPageService';

import "./config"

import TYPES from "./types";

const baseServices = {
    contractService: inject<ContractService>(TYPES.contractService),
    merkleTreeService: inject<MerkleTreeService>(TYPES.merkleTreeService),
    ethersService: inject<EthersService>(TYPES.ethersService),
    alertService: inject<AlertService>(TYPES.alertService),
    routerService: inject<RouterService>(TYPES.routerService),
    assetService: inject<AssetService>(TYPES.assetService),
};

const viewServices = {
    connectPageService: inject<ConnectPageService>(TYPES.connectPageService),
    mintPageService: inject<MintPageService>(TYPES.mintPageService),
};

export const ioc = {
    ...baseServices,
    ...viewServices,
};

window.addEventListener('unhandledrejection', () => {
    ioc.routerService.push('/error-page');
});

window.addEventListener('error', () => {
    ioc.routerService.push('/error-page');
});

if (process.env.REACT_APP_STAGE === 'dev') {
    (window as any).ioc = ioc;
}

export default ioc;

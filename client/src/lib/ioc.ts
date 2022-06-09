
import { inject, serviceManager, singleshot } from 'react-declarative';

import ContractService from "./base/ContractService";
import MerkleTreeService from "./base/MerkleTreeService";
import Web3Service from "./base/Web3Service";
import AlertService from "./base/AlertService";
import RouterService from './base/RouterService';

import HomePageService from './view/HomePageService';

import "./config"

import TYPES from "./types";

const baseServices = {
    contractService: inject<ContractService>(TYPES.contractService),
    merkleTreeService: inject<MerkleTreeService>(TYPES.merkleTreeService),
    web3Service: inject<Web3Service>(TYPES.web3Service),
    alertService: inject<AlertService>(TYPES.alertService),
    routerService: inject<RouterService>(TYPES.routerService),
};

const viewServices = {
    homePageService: inject<HomePageService>(TYPES.homePageService),
};

export const ioc = {
    ...baseServices,
    ...viewServices,
};

export const init = singleshot(async () => {
    try {
        await serviceManager.prefetch();
    } catch(e) {
        console.warn('ioc init failed', e);
    }
});

(window as any).ioc = ioc;

export default ioc;

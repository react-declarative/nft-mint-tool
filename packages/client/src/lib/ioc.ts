
import { inject, serviceManager, singleshot } from 'react-declarative';

import ContractService from "./base/ContractService";
import Web3Service from "./base/Web3Service";

import HomePageService from './view/HomePageService';

import "./config"

import TYPES from "./types";

const baseServices = {
    contractService: inject<ContractService>(TYPES.contractService),
    web3Service: inject<Web3Service>(TYPES.web3Service),
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

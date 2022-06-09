import { provide } from 'react-declarative';

import Web3Service from "./base/Web3Service";
import ContractService from "./base/ContractService";
import MerkleTreeService from './base/MerkleTreeService';
import AlertService from './base/AlertService';
import RouterService from './base/RouterService';

import HomePageService from './view/HomePageService';

import TYPES from "./types";

provide(TYPES.contractService, () => new ContractService());
provide(TYPES.web3Service, () => new Web3Service());
provide(TYPES.merkleTreeService, () => new MerkleTreeService());
provide(TYPES.alertService, () => new AlertService());
provide(TYPES.routerService, () => new RouterService());

provide(TYPES.homePageService, () => new HomePageService());

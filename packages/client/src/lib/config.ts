import { provide } from 'react-declarative';

import Web3Service from "./base/Web3Service";
import ContractService from "./base/ContractService";

import HomePageService from './view/HomePageService';

import TYPES from "./types";

provide(TYPES.contractService, () => new ContractService());
provide(TYPES.web3Service, () => new Web3Service());

provide(TYPES.homePageService, () => new HomePageService());

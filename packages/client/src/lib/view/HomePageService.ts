import { makeAutoObservable } from "mobx";
import { inject } from "react-declarative";

import ContractService from "../base/ContractService";
import Web3Service from "../base/Web3Service";

import TYPES from "../types";

export class HomePageService {

    readonly web3Service = inject<Web3Service>(TYPES.web3Service);
    readonly contractService = inject<ContractService>(TYPES.contractService);

    constructor() {
        makeAutoObservable(this);
    };

};

export default HomePageService;

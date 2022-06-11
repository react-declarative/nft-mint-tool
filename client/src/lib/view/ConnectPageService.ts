import { makeAutoObservable } from "mobx";
import { inject, singleshot } from "react-declarative";

import ContractService from "../base/ContractService";
import RouterService from "../base/RouterService";
import Web3Service from "../base/Web3Service";

import TYPES from "../types";

export class ConnectPageService {

    readonly web3Service = inject<Web3Service>(TYPES.web3Service);
    readonly routerService = inject<RouterService>(TYPES.routerService);
    readonly contractService = inject<ContractService>(TYPES.contractService);

    constructor() {
        makeAutoObservable(this);
    };

    handleConnectClick = singleshot(async () => {
        if (this.web3Service.isWeb3Available) {
            await this.web3Service.enable()
                .then(() => this.routerService.push('/mint-page'))
                .catch(() => this.routerService.push('/permission-page'))
        } else {
            this.routerService.push('/nometamask-page');
        }
    });

};

export default ConnectPageService;

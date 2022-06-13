import { makeAutoObservable } from "mobx";
import { inject, singleshot } from "react-declarative";

import RouterService from "../base/RouterService";
import EthersService from "../base/EthersService";
import LayoutService from "../base/LayoutService";

import TYPES from "../types";

export class ConnectPageService {

    readonly ethersService = inject<EthersService>(TYPES.ethersService);
    readonly routerService = inject<RouterService>(TYPES.routerService);
    readonly layoutService = inject<LayoutService>(TYPES.layoutService);

    constructor() {
        makeAutoObservable(this);
    };

    handleConnectClick = singleshot(async () => {
        this.layoutService.setLoader(true);
        try {
            if (this.ethersService.isMetamaskAvailable) {
                await this.ethersService.enable()
                    .then(() => this.routerService.push('/mint-page'))
                    .catch(() => this.routerService.push('/permission-page'))
            } else {
                this.routerService.push('/nometamask-page');
            }
        } finally {
            this.layoutService.setLoader(false);
        }
    });

};

export default ConnectPageService;

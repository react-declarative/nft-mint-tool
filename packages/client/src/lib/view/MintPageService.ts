import { inject } from 'react-declarative';
import { makeAutoObservable } from 'mobx';

import ContractService from "../base/ContractService";
import LayoutService from "../base/LayoutService";
import AlertService from "../base/AlertService";
import RouterService from "../base/RouterService";

import TYPES from "../types";

export class MintPageService {

    readonly alertService = inject<AlertService>(TYPES.alertService);
    readonly layoutService = inject<LayoutService>(TYPES.layoutService);
    readonly contractService = inject<ContractService>(TYPES.contractService);
    readonly routerService = inject<RouterService>(TYPES.routerService);

    constructor() {
        makeAutoObservable(this);
    };

    handleMintTokensClick = async (quantity: number, cost: number): Promise<undefined | true> => {
        this.layoutService.setLoader(true);
        try {
            const isWhiteListEnabled = await this.contractService.isWhitelistMintEnabled();
            if (isWhiteListEnabled) {
                await this.contractService.whitelistMintTokens(quantity, quantity * cost);
            } else {
                await this.contractService.mintTokens(quantity, quantity * cost);
            }
            this.routerService.push('/aftermint-page');
            return true;
        } catch (e: any) {
            const { message = 'It looks like token mint failed with exception. More info in debug console' } = e;
            this.alertService.notify(message);
            console.warn('It looks like token mint failed with exception', e);
        } finally {
            this.layoutService.setLoader(false);
        }
    };

};

export default MintPageService;

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
        this.layoutService.setModalLoader(true);
        try {
            if (quantity <= 0) {
                this.alertService.notify('Quantity must be greater than zero');
                return;
            }
            const maxAmountPerTx = await this.contractService.maxMintAmountPerTx();
            if (quantity >= maxAmountPerTx) {
                this.alertService.notify(`Quantity must be lower than ${maxAmountPerTx}`);
                return;
            }
            const isWhiteListEnabled = await this.contractService.isWhitelistMintEnabled();
            const isPaused = await this.contractService.isPaused();
            if (isWhiteListEnabled && !isPaused) {
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
            this.layoutService.setModalLoader(false);
        }
    };

};

export default MintPageService;

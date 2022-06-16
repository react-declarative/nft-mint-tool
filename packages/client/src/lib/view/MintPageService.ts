import { inject } from 'react-declarative';
import { makeAutoObservable } from 'mobx';

import ContractService from "../base/ContractService";
import LayoutService from "../base/LayoutService";
import AlertService from "../base/AlertService";
import RouterService from "../base/RouterService";
import EthersService from "../base/EthersService";

import { CC_TOKEN_TYPE, CC_CONTRACT_ADDRESS, CC_TOKEN_DECIMALS, CC_TOKEN_ICON } from '../../config';

import TYPES from "../types";


export class MintPageService {

    readonly alertService = inject<AlertService>(TYPES.alertService);
    readonly layoutService = inject<LayoutService>(TYPES.layoutService);
    readonly contractService = inject<ContractService>(TYPES.contractService);
    readonly routerService = inject<RouterService>(TYPES.routerService);
    readonly ethersService = inject<EthersService>(TYPES.ethersService);

    constructor() {
        makeAutoObservable(this);
    };

    handleImportTokensClick = async () => {
        try {
            const wasAdded = await this.ethersService.provider.request({
                method: 'wallet_watchAsset',
                params: {
                    type: CC_TOKEN_TYPE,
                    options: {
                        address: CC_CONTRACT_ADDRESS,
                        symbol: await this.contractService.symbol(),
                        decimals: CC_TOKEN_DECIMALS,
                        image: CC_TOKEN_ICON
                    },
                },
            });
            if (!wasAdded) {
                this.alertService.notify('Token import failed');
            }
        } catch (e: any) {
            const { message = 'It looks like token impoty failed with exception. More info in debug console' } = e;
            this.alertService.notify(message);
            console.warn('It looks like token import failed with exception', e);
        }
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

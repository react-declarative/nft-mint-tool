import { makeAutoObservable, runInAction } from "mobx";
import { inject, singleshot } from "react-declarative";

import {
    ethers,
    BaseContract,
    BigNumber,
} from "ethers";

import EthersService from "./EthersService";

import { CC_CONTRACT_ADDRESS } from "../../config";
import { CC_CONTRACT_ABI } from "../../config";

import TYPES from "../types";

interface IContract extends BaseContract {
    maxSupply: () => Promise<BigNumber>;
    totalSupply: () => Promise<BigNumber>;
    maxMintAmountPerTx: () => Promise<BigNumber>;
    cost: () => Promise<BigNumber>;
    paused: () => Promise<boolean>;
    whitelistMintEnabled: () => Promise<boolean>;
}

export class ContractService {

    readonly ethersService = inject<EthersService>(TYPES.ethersService);

    private _instance: IContract = null as never;

    get isContractConnected() {
        return !!this._instance;
    };

    constructor() {
        makeAutoObservable(this);
    };

    maxSupply = async () => (await this._instance.maxSupply()).toNumber()
    totalSupply = async () => (await this._instance.totalSupply()).toNumber()
    maxMintAmountPerTx = async () =>  (await this._instance.maxMintAmountPerTx()).toNumber()
    tokenPrice = async () =>  await this._instance.cost()
    isPaused = async () =>  await this._instance.paused()
    isWhitelistMintEnabled = async () => await this._instance.whitelistMintEnabled()

    prefetch = singleshot(async () => {
        console.log("ContractService prefetch started");
        try {
            const deployedCode = await this.ethersService.getCode(CC_CONTRACT_ADDRESS);
            if (deployedCode === '0x') {
                throw new Error('ContractService contract not deployed');
            }
            const instance = new ethers.Contract(
                CC_CONTRACT_ADDRESS,
                CC_CONTRACT_ABI,
                this.ethersService.getSigner(),
            ) as IContract;
            runInAction(() => this._instance = instance);
        } catch (e) {
            console.warn('ContractService prefetch failed', e);
        }
    });

};

export default ContractService;

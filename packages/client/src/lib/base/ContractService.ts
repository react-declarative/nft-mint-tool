import { makeAutoObservable, runInAction } from "mobx";
import { inject, singleshot } from "react-declarative";

import {
    ethers,
    BaseContract,
    BigNumber,
} from "ethers";

import EthersService from "./EthersService";
import MerkleTreeService from "./MerkleTreeService";

import { CC_CONTRACT_ADDRESS } from "../../config";
import { CC_CONTRACT_ABI } from "../../config";

import TYPES from "../types";

interface IContract extends BaseContract {
    maxSupply: () => Promise<BigNumber>;
    totalSupply: () => Promise<BigNumber>;
    maxMintAmountPerTx: () => Promise<BigNumber>;
    name: () => Promise<string>;
    symbol: () => Promise<string>;
    cost: () => Promise<BigNumber>;
    paused: () => Promise<boolean>;
    whitelistMintEnabled: () => Promise<boolean>;
    mint: (amount: number, params: Record<string, any>) => Promise<void>;  
    whitelistMint: (amount: number, proof: string[], params: Record<string, any>) => Promise<void>; 
}

export class ContractService {

    readonly ethersService = inject<EthersService>(TYPES.ethersService);
    readonly merkleTreeService = inject<MerkleTreeService>(TYPES.merkleTreeService);

    private _instance: IContract = null as never;

    get isContractConnected() {
        return !!this._instance;
    };

    constructor() {
        makeAutoObservable(this);
    };

    name = async () => await this._instance.name();
    symbol = async () => await this._instance.symbol();

    maxSupply = async () => (await this._instance.maxSupply()).toNumber()
    totalSupply = async () => (await this._instance.totalSupply()).toNumber()
    maxMintAmountPerTx = async () =>  (await this._instance.maxMintAmountPerTx()).toNumber()
    tokenPrice = async () =>  (await this._instance.cost()).toNumber()
    isPaused = async () =>  await this._instance.paused()
    isWhitelistMintEnabled = async () => await this._instance.whitelistMintEnabled()

    mintTokens = async (amount: number, value: number) => {
        return await this._instance.mint(amount, { value });
    };
  
    whitelistMintTokens = async (amount: number, value: number) => {
        const address = await this.ethersService.getAccount();
        const proof = this.merkleTreeService.getProofForAddress(address!);
        return await this._instance.whitelistMint(amount, proof, {
            value,
        });
    };

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

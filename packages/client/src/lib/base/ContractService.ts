import { makeAutoObservable, runInAction } from "mobx";
import { inject, singleshot } from "react-declarative";

import {
    ethers,
    BaseContract,
    BigNumber,
} from "ethers";

import EthersService from "./EthersService";
import MerkleTreeService from "./MerkleTreeService";

import { CC_CONTRACT_ADDRESS, CC_WHITELIST_ADDRESSES } from "../../config";
import { CC_CONTRACT_ABI } from "../../config";

import TYPES from "../types";

interface IContract extends BaseContract {
    maxSupply: () => Promise<BigNumber>;
    totalSupply: () => Promise<BigNumber>;
    maxMintAmountPerTx: () => Promise<BigNumber>;
    name: () => Promise<string>;
    symbol: () => Promise<string>;
    cost: () => Promise<BigNumber>;
    mintWave: () => Promise<BigNumber>;
    whitelistClaimed: (address: string) => Promise<BigNumber>;
    setMerkleRoot: (address: string) => Promise<void>;
    paused: () => Promise<boolean>;
    whitelistMintEnabled: () => Promise<boolean>;
    whitelistContains: (proof: string[]) => Promise<boolean>;
    mint: (amount: string, params: Record<string, any>) => Promise<void>;  
    whitelistMint: (amount: string, proof: string[], params: Record<string, any>) => Promise<void>; 
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

    name = singleshot(async () => await this._instance.name());
    symbol = singleshot(async () => await this._instance.symbol());
    mintWave = singleshot(async () => Number((await this._instance.mintWave()).toString()));
    maxSupply = singleshot(async () => Number((await this._instance.maxSupply()).toString()));
    totalSupply = singleshot(async () => Number((await this._instance.totalSupply()).toString()));
    maxMintAmountPerTx = singleshot(async () =>  Number((await this._instance.maxMintAmountPerTx()).toString()));
    whitelistClaimed = singleshot(async (address: string) =>  Number((await this._instance.whitelistClaimed(address)).toString()));
    tokenPrice = singleshot(async () =>  Number((await this._instance.cost()).toString()));
    isPaused = singleshot(async () =>  await this._instance.paused());
    isWhitelistMintEnabled = singleshot(async () => await this._instance.whitelistMintEnabled());

    mintTokens = async (amount: number, value: number) => {
        return await this._instance.mint(amount.toString(), {
            value: value.toString(),
        });
    };
  
    whitelistMintTokens = async (amount: number, value: number) => {
        const address = await this.ethersService.getAccount();
        const proof = this.merkleTreeService.getProofForAddress(address!);
        return await this._instance.whitelistMint(amount.toString(), proof, {
            value: value.toString(),
        });
    };

    whitelistContains = async (address: string) => {
        const merkleProof = this.merkleTreeService.getProofForAddress(address);
        if (merkleProof.length) {
            return await this._instance.whitelistContains(merkleProof);
        } else {
            return false;
        }
    };

    updateWhiteList = async () => {
        const root = this.merkleTreeService.getRoot();
        await this._instance.setMerkleRoot(root);
    };

    testWhiteList = async () => {
        for (const address of CC_WHITELIST_ADDRESSES) {
            const hasLocal = this.merkleTreeService.contains(address);
            const hasRemote = await this.whitelistContains(address);
            if (hasLocal && hasRemote) {
                console.log(`${address} ok`)
            } else {
                console.warn(`${address} error local=${hasLocal} remote=${hasRemote}`)
            }
        }
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

import { makeAutoObservable, runInAction } from "mobx";
import { inject, singleshot } from "react-declarative";

import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { Unit } from 'web3-utils';

import { toWei } from 'web3-utils';

import Web3Service from "./Web3Service";

import TYPES from "../types";

import ContractAbi from "../../contracts/SendMoneyExample.json";

export class ContractService {

    readonly web3Service = inject<Web3Service>(TYPES.web3Service);

    private _instance: Contract = null as never;

    get isContractConnected() {
        return !!this._instance;
    };

    get contractAbi(): AbiItem {
        return ContractAbi.abi as any;
    };

    constructor() {
        makeAutoObservable(this);
    };

    getContractAddress = async (): Promise<string | null> => {
        const networkId = await this.web3Service.eth.net.getId();
        const deployedNetwork = (ContractAbi.networks as any)[networkId]!;
        return deployedNetwork?.address || null;
    };

    sendEtherValue = async (method: string, ethers: number, ...args: any) => {
        const amountToSend = toWei(ethers.toString(), "ether");
        const account = this.web3Service.selectedAddress;
        await this._instance.methods[method](...args).send({
            from: account,
            value: amountToSend,
        });
    };

    writeValue = async (method: string, ...args: any[]) => {
        const account = this.web3Service.selectedAddress;
        await this._instance.methods[method](...args).send({ from: account });
    };

    readValue = async (method: string) => {
        const response = await this._instance.methods[method].call();
        debugger
    };

    prefetch = async () => {
        console.log("ContractService initContract started");
        try {
            const address = await this.getContractAddress();
            const instance = new this.web3Service.eth.Contract(
                this.contractAbi,
                address || undefined,
            );
            runInAction(() => this._instance = instance);
            return true;
        } catch (e) {
            console.warn('ContractService initContract failed', e);
            return false;
        }
    };

};

export default ContractService;

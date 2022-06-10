import { makeAutoObservable, runInAction } from "mobx";
import { inject, singleshot } from "react-declarative";

import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { Network } from 'web3-net';

import Web3Service from "./Web3Service";

import TYPES from "../types";

import ContractAbi from "../../contracts/MyToken.json";

export class ContractService {

    readonly web3Service = inject<Web3Service>(TYPES.web3Service);

    _instance: Contract = null as never;

    get isContractConnected() {
        return !!this._instance;
    };

    get instance() {
        return this._instance;
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

    setValue = async () => {
        const accounts = await this.web3Service.eth.getAccounts();
        await this.instance.methods.sampleMethod(5).send({ from: accounts[0] });
    };

    getValue = async () => {
        const response = await this.instance.methods.get().call();
        return response;
    };

    initContract = async () => {
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

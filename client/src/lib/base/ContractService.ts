import { makeAutoObservable, runInAction } from "mobx";
import { inject, singleshot } from "react-declarative";

import { Contract } from 'web3-eth-contract';

import Web3Service from "./Web3Service";

import TYPES from "../types";

import SimpleStorageContract from "../../contracts/MyToken.json";

export class ContractService {

    readonly web3Service = inject<Web3Service>(TYPES.web3Service);

    _instance: Contract = null as never;

    get isContractConnected() {
        return !!this._instance;
    };

    get instance() {
        return this._instance;
    };

    constructor() {
        makeAutoObservable(this);
    };

    setValue = async () => {
        const accounts = await this.web3Service.eth.getAccounts();
        await this.instance.methods.sampleMethod(5).send({ from: accounts[0] });
    };

    getValue = async () => {
        const response = await this.instance.methods.get().call();
        return response;
    };

    prefetch = singleshot(async () => {
        console.log("ContractService prefetch started");
        try {
            const networkId = await this.web3Service.eth.net.getId();
            const deployedNetwork = (SimpleStorageContract.networks as any)[networkId];
            const instance = new this.web3Service.eth.Contract(
              SimpleStorageContract.abi as any,
              deployedNetwork && deployedNetwork.address,
            );
            runInAction(() => this._instance = instance);
        } catch (e) {
            console.warn('ContractService prefetch failed', e);
        }
    });

};

export default ContractService;

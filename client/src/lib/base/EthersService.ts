import { makeAutoObservable, runInAction } from "mobx";

import { singleshot } from "react-declarative";
import { ethers } from 'ethers'

interface IWindowExtended extends Window {
    ethereum: any;
    web3: any;
}

const window = globalThis as unknown as IWindowExtended;

export class EthersService {

    private _provider: ethers.providers.Web3Provider = null as never;

    get isProviderConnected() {
        return !!this._provider;
    };

    get isMetamaskAvailable() {
        return !!window.ethereum;
    };

    get isAccountEnabled() {
        return !!window.ethereum?.selectedAddress;
    };

    constructor() {
        makeAutoObservable(this);
    };

    enable = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });   
    };

    getNetwork = async () => {
        const network = await this._provider.getNetwork();
        return network;
    };

    getAccount = async () => {
        const accounts = await this._provider.listAccounts();
        return accounts[0] || null;
    };

    getSigner = () => {
        return this._provider.getSigner();
    };

    getCode = (address: string) => {
        return this._provider.getCode(address);
    };

    prefetch = singleshot(async () => {
        console.log("Web3Service prefetch started");
        try {
            if (window.ethereum) {
                console.log("Web3Service prefetch eip-1102 detected");
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                runInAction(() => this._provider = provider);
            }
        } catch (e) {
            console.warn('Web3Service prefetch failed', e);
        }
    });

};

export default EthersService;

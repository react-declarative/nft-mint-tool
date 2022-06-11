import { makeAutoObservable, runInAction } from "mobx";

import { singleshot } from "react-declarative";

import Web3 from "web3";

interface IWindowExtended extends Window {
    ethereum: any;
    web3: any;
}

const window = globalThis as unknown as IWindowExtended;

export class Web3Service {

    private _web3?: Web3;

    get isWeb3Connected() {
        return !!this._web3;
    };

    get isWeb3Available() {
        return !!window.ethereum;
    };

    get isAccountEnabled() {
        return !!window.ethereum.selectedAddress;
    };

    get selectedAddress(): string | null {
        return window.ethereum.selectedAddress;
    };

    get eth() {
        if (this._web3) {
            return this._web3.eth;
        } else {
            throw new Error('Web3Service no web3 instance');
        }
    };

    constructor() {
        makeAutoObservable(this);
    };

    enable = singleshot(async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });   
    });

    prefetch = singleshot(async () => {
        console.log("Web3Service prefetch started");
        try {
            if (window.ethereum) {
                console.log("Web3Service prefetch eip-1102 detected");
                const web3 = new Web3(window.ethereum);
                runInAction(() => this._web3 = web3);
            }
        } catch (e) {
            console.warn('Web3Service prefetch failed', e);
        }
    });

};

export default Web3Service;

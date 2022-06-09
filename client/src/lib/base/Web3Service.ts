import { makeAutoObservable, runInAction } from "mobx";

import { singleshot } from "react-declarative";

import Web3 from "web3";

import waitForEvent from '../../utils/waitForEvent';

import { CC_WEB3_HTTP_RPC } from "../../config";

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

    get isMetaMask() {
        return window.ethereum?.isMetaMask;
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

    connect = singleshot(async () => {
        console.log("Web3Service connect started");
        try {
            if (window.ethereum) {
                console.log("Modern (eip-1102) web3 detected.");
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                runInAction(() => this._web3 = web3);
                return true;
            } else if (window.web3) {
                console.log("Injected (legacy) web3 detected.");
                this._web3 = window.web3;
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.warn('Web3Service prefetch failed', e);
            return false;
        }
    });

};

export default Web3Service;

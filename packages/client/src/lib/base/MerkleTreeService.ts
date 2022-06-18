import { makeAutoObservable } from "mobx";

import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";

import { CC_WHITELIST_ADDRESSES } from "../../config";

export class MerkleTreeService {

  private _merkleTree: MerkleTree = null as never;

  constructor() {
    makeAutoObservable(this);
  };

  private getMerkleTree(): MerkleTree {
    if (!this._merkleTree) {
      const leafNodes = CC_WHITELIST_ADDRESSES.map(addr => keccak256(addr));
      this._merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    }
    return this._merkleTree;
  };

  public getProofForAddress(address: string): string[] {
    return this.getMerkleTree().getHexProof(keccak256(address));
  };

  public getRawProofForAddress(address: string): string {
    return this.getProofForAddress(address).toString().replaceAll('\'', '').replaceAll(' ', '');
  };

  public getRoot() {
    if (CC_WHITELIST_ADDRESSES.length < 2) {
      console.warn('WhiteList must contain more than two addresses');
    }
    return this.getMerkleTree().getHexRoot();
  };

  public contains(address: string): boolean {
    return this.getMerkleTree().getLeafIndex(Buffer.from(keccak256(address))) >= 0;
  };

};

export default MerkleTreeService;

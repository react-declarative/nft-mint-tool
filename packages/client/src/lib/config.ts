import { provide } from 'react-declarative';

import EthersService from "./base/EthersService";
import ContractService from "./base/ContractService";
import MerkleTreeService from './base/MerkleTreeService';
import AlertService from './base/AlertService';
import RouterService from './base/RouterService';
import AssetService from './base/AssetService';
import LayoutService from './base/LayoutService';

import ConnectPageService from './view/ConnectPageService';
import MintPageService from './view/MintPageService';

import TYPES from "./types";

provide(TYPES.contractService, () => new ContractService());
provide(TYPES.ethersService, () => new EthersService());
provide(TYPES.merkleTreeService, () => new MerkleTreeService());
provide(TYPES.alertService, () => new AlertService());
provide(TYPES.routerService, () => new RouterService());
provide(TYPES.assetService, () => new AssetService());
provide(TYPES.layoutService, () => new LayoutService());

provide(TYPES.connectPageService, () => new ConnectPageService());
provide(TYPES.mintPageService, () => new MintPageService());

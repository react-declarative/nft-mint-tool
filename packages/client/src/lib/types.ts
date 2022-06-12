const baseServices = {
    ethersService: Symbol.for('ethersService'),
    contractService: Symbol.for('contractService'),
    merkleTreeService: Symbol.for('merkleTreeService'),
    alertService: Symbol.for('alertService'),
    routerService: Symbol.for('routerService'),
    assetService: Symbol.for('assetService'),
};

const viewServices = {
    connectPageService: Symbol.for('connectPageService'),
    mintPageService: Symbol.for('mintPageService'),
};

export const TYPES = {
    ...baseServices,
    ...viewServices,
};

export default TYPES;
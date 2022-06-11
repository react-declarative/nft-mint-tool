const baseServices = {
    web3Service: Symbol.for('web3Service'),
    contractService: Symbol.for('contractService'),
    merkleTreeService: Symbol.for('merkleTreeService'),
    alertService: Symbol.for('alertService'),
    routerService: Symbol.for('routerService'),
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
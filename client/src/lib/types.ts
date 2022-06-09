const baseServices = {
    web3Service: Symbol.for('web3Service'),
    contractService: Symbol.for('contractService'),
    merkleTreeService: Symbol.for('merkleTreeService'),
    alertService: Symbol.for('alertService'),
    routerService: Symbol.for('routerService'),
};

const viewServices = {
    homePageService: Symbol.for('homePageService'),
};

export const TYPES = {
    ...baseServices,
    ...viewServices,
};

export default TYPES;
const baseServices = {
    web3Service: Symbol.for('web3Service'),
    contractService: Symbol.for('contractService'),
};

const viewServices = {
    homePageService: Symbol.for('homePageService'),
};

export const TYPES = {
    ...baseServices,
    ...viewServices,
};

export default TYPES;
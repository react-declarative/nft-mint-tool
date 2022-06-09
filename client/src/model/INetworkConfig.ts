export interface INetworkConfig {
  chainId: number;
  symbol: string;
  blockExplorer: {
    name: string;
    generateContractUrl: (contractAddress: string) => string;
  };
};

export default INetworkConfig;

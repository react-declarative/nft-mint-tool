import { roundTicks } from 'react-declarative';
import { fromWei } from 'web3-utils';

import { BigNumber } from 'ethers';

export const weiToEth = (wei: BigNumber | number) => {
    const value = fromWei(wei.toString(), 'ether');
    return roundTicks(Number(value), 6);
};

export default weiToEth;

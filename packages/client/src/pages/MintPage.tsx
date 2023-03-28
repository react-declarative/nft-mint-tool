import React from 'react';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import { Async } from 'react-declarative';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import SupplyCard from '../components/common/SupplyCard';
import WalletCard from '../components/common/WalletCard';
import PausedCard from '../components/common/PausedCard';
import NotWhitelistedCard from '../components/common/NotWhitelistedCard';
import WhitelistMintedCard from '../components/common/WhitelistMintedCard';
import LoadingCard from '../components/common/LoadingCard';
import SoldOutCard from '../components/common/SoldOutCard';
import MintCard from '../components/common/MintCard';
import ImportTokenCard from '../components/common/ImportTokenCard';

import Logo from '../components/common/Logo';

import ioc from '../lib/ioc';

const useStyles = makeStyles<Theme>((theme) => ({
    root: {
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 15,
        gap: 15,
    },
    title: {
        minWidth: 375,
        maxWidth: 375,
        padding: 15,
        display: 'flex',
    },
}));

export const MintPage = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Paper className={classes.title}>
                <Logo />
            </Paper>
            <WalletCard />
            <Async Loader={LoadingCard} throwError>
                {async () => {
                    const address = await ioc.ethersService.getAccount();
                    const isPaused = await ioc.contractService.isPaused();
                    const isWhiteListEnabled = await ioc.contractService.isWhitelistMintEnabled();
                    const merkleProof = ioc.merkleTreeService.getRawProofForAddress(address!);

                    const whitelistContains = await ioc.contractService.whitelistContains(address!);
                    const totalSupply = await ioc.contractService.totalSupply();
                    const maxSupply = await ioc.contractService.maxSupply();

                    if (totalSupply === maxSupply) {
                        return <SoldOutCard />;
                    } else if (!isPaused) {
                        return <MintCard />;
                    } else if (isWhiteListEnabled) {
                        if (merkleProof.length && whitelistContains) {
                            const mintWave = await ioc.contractService.mintWave();
                            const claimed = await ioc.contractService.whitelistClaimed(address!);
                            if (mintWave === claimed) {
                                return <WhitelistMintedCard />;
                            } else {
                                return <MintCard />;
                            }
                        } else {
                            return <NotWhitelistedCard />;
                        }
                    } else {
                        return <PausedCard />;
                    }
                }}
            </Async>
            <SupplyCard />
            <ImportTokenCard />
        </Box>
    );
};

export default MintPage;

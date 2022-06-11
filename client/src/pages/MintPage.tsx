import React from 'react';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import SupplyCard from '../components/common/SupplyCard';
import WalletCard from '../components/common/WalletCard';
import PausedCard from '../components/common/PausedCard';

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

    const handleReload = () => {
        window.location.reload();
    };
    return (
        <Box className={classes.root}>
            <Paper className={classes.title}>
                <img loading='lazy' width="100%" src={ioc.assetService.src('/logo.png')} />
            </Paper>
            <WalletCard />
            <PausedCard />
            <SupplyCard />
        </Box>
    );
};

export default MintPage;

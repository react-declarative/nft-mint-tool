import React from 'react';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

import WhitelistProofCard from '../components/common/WhitelistProofCard';
import Logo from '../components/common/Logo';

import { CC_ETHERSCAN_URL } from '../config';

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
        gap: 15,
        padding: 15,
    },
    container: {
        flex: 1,
        minWidth: 375,
        maxWidth: 375,
        padding: 15,
    },
}));

export const ConnectPage = () => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Paper className={classes.container}>
                <Stack direction='column' gap="15px">
                    <Logo />
                    <span>
                        Hey, looking for a <strong>super-safe experience</strong>? <span className="emoji">😃</span><br />
                        You can interact with the smart-contract <strong>directly</strong> through <Link href={CC_ETHERSCAN_URL}><strong>Etherscan</strong></Link>, without even
                        connecting your wallet to this DAPP! <span className="emoji">🚀</span><br />
                    </span>
                    <Button
                        variant="contained"
                        onClick={ioc.connectPageService.handleConnectClick}
                    >
                        Connect wallet
                    </Button>
                </Stack>
            </Paper>
            <WhitelistProofCard />
        </Box>
    );
};

export default ConnectPage;

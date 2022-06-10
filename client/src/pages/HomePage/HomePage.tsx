import React from 'react';

import { makeStyles } from '@mui/styles';
import { Stack, Theme } from '@mui/material';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

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
    },
    container: {
        flex: 1,
        minWidth: 450,
        maxWidth: 450,
        padding: 15,
    },
}));

export const HomePage = () => {
    const classes = useStyles();

    const generateContractUrl = () => "";

    return (
        <Box className={classes.root}>
            <Paper className={classes.container}>
                <Stack direction='column' gap="15px">
                    <img loading='lazy' width="100%" src="/logo.png" />
                    <span>
                        Hey, looking for a <strong>super-safe experience</strong>? <span className="emoji">😃</span><br />
                        You can interact with the smart-contract <strong>directly</strong> through <strong>Etherscan</strong>, without even
                        connecting your wallet to this DAPP! <span className="emoji">🚀</span><br />
                    </span>
                    <Button variant="contained">Connect wallet</Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default HomePage;

import React from 'react';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

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
    return (
        <Box className={classes.root}>
            <Paper className={classes.container}>
                <>
                    We were not able to detect <strong>MetaMask</strong>. We value <strong>privacy and security</strong>
                    a lot so we limit the wallet options on the DAPP.<br />
                    <br />
                    But don't worry! <span className="emoji">😃</span> You can always interact with the smart-contract
                    through <a href="#" target="_blank">123</a> and <strong>we do our best to provide you with the best
                    user experience possible</strong>, even from there.<br />
                    <br />
                    You can also get your <strong>Whitelist Proof</strong> manually, using the tool below.
                </>,
                <br />
                <Button variant="contained">Connect wallet</Button>
            </Paper>
        </Box>
    );
};

export default HomePage;

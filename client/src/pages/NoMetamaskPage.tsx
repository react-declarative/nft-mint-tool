import React from 'react';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
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

export const NoMetamaskPage = () => {
    const classes = useStyles();

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <Box className={classes.root}>
            <Paper className={classes.container}>
                <Stack direction='column' gap="15px">
                    <img loading='lazy' width="100%" height="113px" src="/logo.png" />
                    <span>
                        We were not able to detect <strong>MetaMask</strong> <span className="emoji">😐</span>.
                        We value <strong>privacy and security</strong> a lot so we 
                        limit the wallet options on the DAPP.<br />
                        Please reload this page and try again
                    </span>
                    <Button
                        variant="contained"
                        onClick={handleReload}
                    >
                        Reload page
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default NoMetamaskPage;

import React from 'react';

import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import ImportTokenCard from '../components/common/ImportTokenCard';

import ioc from '../lib/ioc';

const useStyles = makeStyles({
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
});

export const ConnectPage = () => {
    const classes = useStyles();

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <Box className={classes.root}>
            <Paper className={classes.container}>
                <Stack direction='column' gap="15px">
                    <img loading='lazy' width="100%" src={ioc.assetService.src('/logo.png')}  />
                    <span>
                        <strong>Congratulations!</strong> <span className="emoji">🎉  Tokens have been <strong>minted</strong></span><br />
                    </span>
                    <Button
                        variant="contained"
                        onClick={handleReload}
                    >
                        Reload page
                    </Button>
                </Stack>
            </Paper>
            <ImportTokenCard />
        </Box>
    );
};

export default ConnectPage;

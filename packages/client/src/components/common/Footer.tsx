import React from 'react';
import { useState } from 'react';

import { makeStyles } from '@mui/styles';
import { Theme, alpha, lighten } from '@mui/material';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import CloseIcon from '@mui/icons-material/Close';

import { CC_ETHERSCAN_URL, CC_CONTRACT_ADDRESS } from '../../config';

const FOOTER_HEIGHT = 55;

const useStyles = makeStyles<Theme>((theme) => ({
    root: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        left: 0,
        height: FOOTER_HEIGHT,
        background: alpha(lighten(theme.palette.background.default, 0.05), 0.8),
        backdropFilter: 'saturate(180%) blur(20px)',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
    },
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
    },
    adjust: {
        paddingTop: FOOTER_HEIGHT,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));

export const Footer = () => {
    const classes = useStyles();
    const [closed, setClosed] = useState(false);
    return !closed ? (
        <>
            <Box className={classes.adjust} />
            <Box className={classes.root}>
                <Box className={classes.container}>
                    <Typography variant="body2">
                        FYN contract address is <Link href={CC_ETHERSCAN_URL}><strong>{CC_CONTRACT_ADDRESS}</strong></Link>
                    </Typography>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 15,
                            bottom: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <IconButton onClick={() => setClosed(true)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </>
    ) : null;
};

export default Footer;

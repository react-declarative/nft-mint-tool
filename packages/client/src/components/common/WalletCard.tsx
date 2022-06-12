import React, { useEffect } from 'react';

import { Async } from 'react-declarative';

import { makeStyles } from '@mui/styles';
import { alpha, Theme, Tooltip } from '@mui/material';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import sleep from '../../utils/sleep';

import classNames from 'classnames';

import ioc from '../../lib/ioc';

interface IWalletCardProps {
    style?: React.CSSProperties;
    className?: string;
}

const useStyles = makeStyles<Theme>((theme) => ({
    root: {
        minWidth: 375,
        maxWidth: 375,
        minHeight: 155,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        '& > *': {
            padding: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'stretch',
            flexDirection: 'column',
            gap: 5,
            '& > *': {
                flex: 1,
            },
        },
        '& > *:nth-child(1)': {
            borderBottom: `1px solid ${alpha(theme.palette.getContrastText(theme.palette.background.default), 0.23)}`,
            gridColumnStart: 1,
            gridColumnEnd: 3,
        },
        '& > *:nth-child(2)': {
            borderRight: `1px solid ${alpha(theme.palette.getContrastText(theme.palette.background.default), 0.23)}`
        }
    },
    bold: {
        fontWeight: 'bold !important',
    },
}));

const Loader = () => (
    <Box
        sx={{
            '& .MuiCircularProgress-root': {
                height: 20,
                width: 20,
            }
        }}
    >
        <CircularProgress
            size="small"
        />
    </Box>
);

export const WalletCard = ({
    style,
    className,
}: IWalletCardProps) => {

    const classes = useStyles();

    return (
        <Paper
            className={classNames(className, classes.root)}
            style={style}
        >
            <Box>
                <Typography className={classes.bold}>
                    Wallet address
                </Typography>
                <Typography
                    sx={{
                        maxWidth: 345,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    <Async Loader={Loader} throwError>
                        {async () => await ioc.ethersService.getAccount()}
                    </Async>
                </Typography>
            </Box>
            <Box>
                <Typography className={classes.bold}>
                    Supply
                </Typography>
                <Typography>
                    <Async Loader={Loader} throwError>
                        {async () => {
                            const totalSupply = await ioc.contractService.totalSupply();
                            const maxSupply = await ioc.contractService.maxSupply();
                            return `${totalSupply}/${maxSupply}`
                        }}
                    </Async>
                </Typography>
            </Box>
            <Box>
                <Typography className={classes.bold}>
                    Sale status
                </Typography>
                <Typography>
                    <Async Loader={Loader} throwError>
                        {async () => {
                            const isPaused = await ioc.contractService.isPaused();
                            const isWhiteListEnabled = await ioc.contractService.isWhitelistMintEnabled();
                            if (isWhiteListEnabled) {
                                return 'Whitelist';
                            } else if (!isPaused) {
                                return 'Running';
                            } else {
                                return 'Paused';
                            }
                        }}
                    </Async>
                </Typography>
            </Box>
        </Paper>
    );
};

export default WalletCard;

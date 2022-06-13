import React from 'react';

import { Async } from 'react-declarative';

import { makeStyles } from '@mui/styles';
import { alpha, Theme } from '@mui/material';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import classNames from 'classnames';

import weiToEth from '../../utils/weiToEth';

import ioc from '../../lib/ioc';

interface ISupplyCardProps {
    style?: React.CSSProperties;
    className?: string;
}

const useStyles = makeStyles<Theme>((theme) => ({
    root: {
        minWidth: 375,
        maxWidth: 375,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        '& > *': {
            padding: 15,
            borderBottom: `1px solid ${alpha(theme.palette.getContrastText(theme.palette.background.default), 0.23)}`,
        },
    },
    noBorder: {
        border: 'none !important',
    },
    bold: {
        fontWeight: 'bold !important',
    },
}));

const Loader = () => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            '& .MuiCircularProgress-root': {
                height: 25,
                width: 25,
            }
        }}
    >
        <CircularProgress
            size="small"
        />
    </Box>
);

export const SupplyCard = ({
    style,
    className,
}: ISupplyCardProps) => {

    const classes = useStyles();

    return (
        <Paper
            className={classNames(className, classes.root)}
            style={style}
        >
            <Typography className={classes.bold}>
                Token Name
            </Typography>
            <Typography>
                <Async Loader={Loader} throwError>
                    {async () => await ioc.contractService.name()}
                </Async>
            </Typography>
            <Typography className={classes.bold}>
                Token Symbol
            </Typography>
            <Typography>
                <Async Loader={Loader} throwError>
                    {async () => await ioc.contractService.symbol()}
                </Async>
            </Typography>
            <Typography className={classes.bold}>
                Mint Wave
            </Typography>
            <Typography>
                <Async Loader={Loader} throwError>
                    {async () => `№ ${await ioc.contractService.mintWave()}`}
                </Async>
            </Typography>
            <Typography className={classes.bold}>
                Wave Price
            </Typography>
            <Typography>
                <Async Loader={Loader} throwError>
                    {async () => {
                        const tokenPrice = await ioc.contractService.tokenPrice();
                        return `${weiToEth(tokenPrice)} ETH`;
                    }}
                </Async>
            </Typography>
            <Typography className={classNames(classes.noBorder, classes.bold)}>
                Max Amount per TX
            </Typography>
            <Typography className={classes.noBorder}>
                <Async Loader={Loader} throwError>
                    {async () => await ioc.contractService.maxMintAmountPerTx()}
                </Async>
            </Typography>
        </Paper>
    );
};

export default SupplyCard;

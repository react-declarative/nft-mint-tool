import React from 'react';

import { Async } from 'react-declarative';

import { makeStyles } from '@mui/styles';
import { alpha, Theme } from '@mui/material';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import sleep from '../../utils/sleep';

import classNames from 'classnames';

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
                Total Supply
            </Typography>
            <Typography>
                <Async Loader={Loader}>
                    {async () => {
                        await sleep(50_000);
                        return '0';
                    }}
                </Async>
            </Typography>
            <Typography className={classes.bold}>
                Max Supply
            </Typography>
            <Typography>
                <Async Loader={Loader}>
                {async () => {
                        await sleep();
                        return '0';
                    }}
                </Async>
            </Typography>
            <Typography className={classNames(classes.noBorder, classes.bold)}>
                Token price
            </Typography>
            <Typography className={classes.noBorder}>
                <Async Loader={Loader}>
                {async () => {
                        await sleep();
                        return '0';
                    }}
                </Async>
            </Typography>
        </Paper>
    );
};

export default SupplyCard;

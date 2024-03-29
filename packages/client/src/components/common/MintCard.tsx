import React from 'react';
import { useState } from 'react';

import { OneTyped, FieldType, TypedField, useStaticHandler } from 'react-declarative';

import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import PlusIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';

import weiToEth from '../../utils/weiToEth';

import { CC_MAX_AMOUNT_DIGITS } from '../../config';

import ioc from '../../lib/ioc';

const BACKDROP_DELAY = 500;

const MAX_AMOUNT = 10 ** CC_MAX_AMOUNT_DIGITS - 1;
const MAX_AMOUNT_TMPL = MAX_AMOUNT.toString().split('').fill('0').join('');

const useStyles = makeStyles({
    root: {
        position: 'relative',
        minWidth: 375,
        maxWidth: 375,
        minHeight: 350,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    backdrop: {
        position: 'absolute',
        background: '#4b4b4b',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const fields: TypedField[] = [
    {
        type: FieldType.Component,
        element: () => (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 235,
                    background: alpha('#000', 0.33),
                }}
            >
                <img
                    loading="lazy"
                    style={{ height: '75%', marginTop: -5 }}
                    src={ioc.assetService.src('/preview.png')}
                />
            </Box>
        )
    },
    {
        type: FieldType.Group,
        style: {
            padding: 5,
        },
        fields: [
            {
                type: FieldType.Div,
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    marginBottom: 15,
                },
                fields: [
                    {
                        type: FieldType.Component,
                        element: ({
                            quantity,
                            onChange,
                        }) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    pr: 1
                                }}
                            >
                                <IconButton
                                    size="small"
                                    onClick={() => onChange({
                                        quantity: Math.max(parseInt(quantity || 0) - 1, 0).toString(),
                                    })}
                                >
                                    <MinusIcon />
                                </IconButton>
                            </Box>
                        ),
                    },
                    {
                        type: FieldType.Text,
                        outlined: false,
                        title: 'Quantity',
                        name: 'quantity',
                        defaultValue: '1',
                        fieldRightMargin: '0',
                        fieldBottomMargin: '0',
                        inputFormatterTemplate: MAX_AMOUNT_TMPL,
                        inputFormatterAllowed: /([0-9])/g,
                    },
                    {
                        type: FieldType.Component,
                        element: ({
                            quantity,
                            onChange,
                        }) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    pl: 1
                                }}
                            >
                                <IconButton
                                    size="small"
                                    onClick={() => onChange({
                                        quantity: Math.min(parseInt(quantity || 0) + 1, MAX_AMOUNT).toString(),
                                    })}
                                >
                                    <PlusIcon />
                                </IconButton>
                            </Box>
                        ),
                    },
                ]
            },
            {
                type: FieldType.Component,
                element: ({
                    quantity: Q,
                    cost: C,
                }) => {
                    const quantity = parseInt(Q || 0);
                    const cost = parseInt(C || 0);
                    const eths = weiToEth(quantity * cost);
                    return (
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr auto',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '5px',
                                    marginBottom: '-2.5px',
                                    gap: '5px',
                                }}
                            >
                                <Typography>
                                    <strong>Total price:</strong>
                                </Typography>
                                <Typography variant="body2">
                                    {`${eths} ETH`}
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                onClick={() => ioc.mintPageService.handleMintTokensClick(quantity, cost)}
                            >
                                Mint
                            </Button>
                        </Box>
                    );
                },
            },
        ]
    },
];

export const MintCard = () => {

    const classes = useStyles();

    const [backdrop, setBackdrop] = useState(true);

    const handler = useStaticHandler(async () => ({
        cost: await ioc.contractService.tokenPrice(),
    }), {
        onLoadBegin: () => setBackdrop(true),
        onLoadEnd: () => setTimeout(() => setBackdrop(false), BACKDROP_DELAY),
    })

    return (
        <Paper className={classes.root}>
            {backdrop && (
                <Box className={classes.backdrop}>
                    <CircularProgress />
                </Box>
            )}
            <OneTyped
                handler={handler}
                fields={fields}
            />
        </Paper>
    );
};

export default MintCard;

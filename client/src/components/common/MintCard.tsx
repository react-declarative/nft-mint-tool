import React from 'react';
import { useState } from 'react';

import { OneTyped, FieldType, TypedField, useStaticHandler } from 'react-declarative';

import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import PlusIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';

import weiToEth from '../../utils/weiToEth';

import ioc from '../../lib/ioc';

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
                                        quantity: Math.max(parseInt(quantity) - 1, 0).toString(),
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
                        inputFormatterTemplate: '000000',
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
                                        quantity: (parseInt(quantity) + 1).toString(),
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
                    quantity,
                    cost,
                }) => {
                    const eths = weiToEth(parseInt(quantity) * parseInt(cost));
                    return (
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr auto',
                            }}
                        >
                            <Typography
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                }}
                            >
                                <strong>Total price:</strong>
                                {`${eths} ETH`}
                            </Typography>
                            <Button variant="contained">
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

    const handler = useStaticHandler(() => {
        return {
            cost: 1_000_000_000_000_000_000,
        };
    }, {
        onLoadBegin: () => setBackdrop(true),
        onLoadEnd: () => setBackdrop(false),
    })

    return (
        <Paper className={classes.root}>
            {backdrop && (
                <Backdrop
                    sx={{
                        position: 'absolute',
                        background: 'transparent',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                    open={backdrop}
                >
                    <CircularProgress />
                </Backdrop>
            )}
            <OneTyped
                handler={handler}
                fields={fields}
            />
        </Paper>
    );
};

export default MintCard;

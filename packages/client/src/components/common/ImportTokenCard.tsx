import React from 'react';

import { Async } from 'react-declarative';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ioc from '../../lib/ioc';

const Loader = () => (
    <CardContent>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: 140,
            }}
        >
            <CircularProgress />
        </Box>
    </CardContent>
);

export const ImportTokenCard = () => (
    <Card
        sx={{
            minWidth: 375,
            maxWidth: 375,
            minHeight: 180,
        }}
    >

        <Async Loader={Loader} throwError>
            {async () => {
                const symbol = await ioc.contractService.symbol();
                return (
                    <>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Import {symbol} to MetaMask
                            </Typography>
                            <Typography variant="body2">
                                When a user opens their MetaMask, they are shown a variety of assets, including tokens.
                                You can import {symbol} token by clicking a label
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={ioc.mintPageService.handleImportTokensClick} color="primary">
                                Import token
                            </Button>
                        </CardActions>
                    </>
                );
            }}
        </Async>
    </Card>
);

export default ImportTokenCard;

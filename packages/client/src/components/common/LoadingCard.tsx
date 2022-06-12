import React from 'react';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import classNames from 'classnames';

const useStyles = makeStyles<Theme>((theme) => ({
    root: {
        minWidth: 375,
        maxWidth: 375,
        minHeight: 350,
        padding: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        '& > :nth-child(1)': {
            fontSize: '2.25rem',
        },
    },
}));

export const LoadingCard = () => {

    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <CircularProgress />
        </Paper>
    );
};

export default LoadingCard;

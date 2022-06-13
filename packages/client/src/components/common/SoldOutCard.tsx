import React from 'react';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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

export const SoldOutCard = () => {

    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <span className="emoji">⏳</span>
            <Typography style={{ textAlign: 'center' }}>
                It looks like all tokens has been sold out <strong>on this wave</strong>.<br /> 
                Please come back during the next one!
            </Typography>
        </Paper>
    );
};

export default SoldOutCard;

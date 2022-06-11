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

interface IPausedCardProps {
    style?: React.CSSProperties;
    className?: string;
}

const useStyles = makeStyles<Theme>((theme) => ({
    root: {
        minWidth: 375,
        maxWidth: 375,
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

export const PausedCard = ({
    style,
    className,
}: IPausedCardProps) => {

    const classes = useStyles();

    return (
        <Paper
            className={classNames(className, classes.root)}
            style={style}
        >
            <span className="emoji">⏳</span>
            <Typography style={{ textAlign: 'center' }}>
                The contract is <strong>paused</strong>.<br /> 
                Please come back during the next sale!
            </Typography>
        </Paper>
    );
};

export default PausedCard;

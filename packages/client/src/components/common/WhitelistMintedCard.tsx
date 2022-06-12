import React from 'react';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import classNames from 'classnames';

interface IPausedCardProps {
    style?: React.CSSProperties;
    className?: string;
}

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
                It looks like you has already minted on this <strong>whitelist</strong> wave.<br /> 
                Please come back during the next one!
            </Typography>
        </Paper>
    );
};

export default PausedCard;

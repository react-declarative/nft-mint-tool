import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { CC_ETHERSCAN_URL, CC_CONTRACT_ADDRESS } from '../../config';

const FOOTER_HEIGHT = 55;

const useStyles = makeStyles<Theme>((theme) => ({
    root: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        left: 0,
        height: FOOTER_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: theme.palette.background.default,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    adjust: {
        paddingTop: FOOTER_HEIGHT,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));

export const Footer = () => {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.adjust} />
            <Box className={classes.root}>
                <Typography variant="body2">
                    The smart-contract address is <Link href={CC_ETHERSCAN_URL}><strong>{CC_CONTRACT_ADDRESS}</strong></Link>
                </Typography>
            </Box>
        </>
    );
};

export default Footer;

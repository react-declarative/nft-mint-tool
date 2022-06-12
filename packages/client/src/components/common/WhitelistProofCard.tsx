import { OneTyped, FieldType, TypedField } from 'react-declarative';

import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ioc from '../../lib/ioc';

const useStyles = makeStyles<Theme>((theme) => ({
    root: {
        minWidth: 375,
        maxWidth: 375,
        padding: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
}));

const createClickHandler = (address: string) => () => {
    const merkleProof = ioc.merkleTreeService.getRawProofForAddress(address);

    if (!merkleProof.length) {
        ioc.alertService.notify('The given address is not in the whitelist, please double-check.')
        return;
    }

    navigator.clipboard.writeText(merkleProof);

    ioc.alertService.notify('Congratulations! This address is whitelisted. Your Merkle Proof has been copied to the clipboard');
};

const fields: TypedField[] = [
    {
        type: FieldType.Text,
        title: 'Public address',
        placeholder: '0x000...',
        name: 'address',
    },
    {
        type: FieldType.Component,
        element: ({
            address,
        }) => (
            <Button
                onClick={createClickHandler(address)}
                variant="contained"
            >
                Generate and copy to clipboard
            </Button>
        ),
    },
]

export const WhitelistProofCard = () => {

    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography variant="h6" align="center">
                Whitelist Proof
            </Typography>
            <Typography variant="body1" pb={2}>
                Anyone can generate the proof using any public address in the list, but <strong>only the owner of that address</strong> will be able to make a successful transaction by using it.
            </Typography>
            <OneTyped fields={fields} />
        </Paper>
    );
};

export default WhitelistProofCard;

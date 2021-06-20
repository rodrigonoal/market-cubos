import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomError({ erro }) {
    const classes = useStyles();
    const [values, setValues] = useState({
        open: false,
        message: '',
    });


    useEffect(() => {
        setValues({ open: true, message: `${erro}` });

    }, [erro])

    const handleClose = (event, reason) => {
        setValues({ ...values, open: false, message:'' });

        if (reason === 'clickaway') {
            return;
        }
    };

    return (

        <div className={classes.root}>
            <Snackbar
                open={values.open}
                autoHideDuration={5000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {values.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

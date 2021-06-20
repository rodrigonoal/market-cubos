import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import useAuth from '../../hooks/useAuth';
import Dialog from '@material-ui/core/Dialog';
import Alert from '@material-ui/lab/Alert';
import CustomBackdrop from '../CustomBackdrop';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { del } from '../../services/ApiClient';


const useStyles = makeStyles((theme) => ({
    button: {
        position: 'fixed',
        marginLeft: 33,
        marginTop: 10,
        zIndex: 100,
    },
}));

export default function CustomDelete({ id, nome }) {
    const classes = useStyles();
    const { token } = useAuth();
    const [values, setValues] = useState({
        erro: '',
        carregando: false,
        open: false,
    });

    const handleClickOpen = (e) => {
        setValues({ ...values, open: true });
        e.stopPropagation()
    };

    const handleClose = () => {
        setValues({ ...values, open: false });
    };

    async function deletarProduto() {
        setValues({ ...values, erro: '' });
        setValues({ ...values, carregando: true });

        try {
            const resposta = await (await del(`produtos/${id}`, token)).json();

            setValues({ ...values, carregando: false });

            resposta && window.location.reload();
        } catch (error) {
            setValues({ ...values, erro: error.message });

            return;
        }
        setValues({ ...values, carregando: true });

    }



    return (
        <div>

            <Fab
                color="secondary"
                className={classes.button}
                onClick={(e) => handleClickOpen(e)}>
                <DeleteIcon />
            </Fab>

            <Dialog
                open={values.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Remover produto ${nome} do catálogo?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Esta ação não poderá ser desfeita.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Manter Produto
                    </Button>
                    <Button onClick={deletarProduto} color="primary" autoFocus>
                        Remover
                    </Button>
                </DialogActions>
            </Dialog>
            {values.erro && <Alert severity="error">{values.erro}</Alert>}
            {values.carregando && <CustomBackdrop></CustomBackdrop>}
        </div>
    );
}
import React, { useState } from 'react';
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
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        borderRadius: '50%',
        width: '20px',
    },
}));

export default function CustomDelete({ id, nome }) {
    const history = useHistory();
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

            window.location.reload();
        } catch (error) {
            setValues({ ...values, erro: error.message });

            return;
        }
        setValues({ ...values, carregando: true });

    }





    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={(e) => handleClickOpen(e)}
            >
            </Button>

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
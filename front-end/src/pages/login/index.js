import React, { useState } from 'react';
import useStyles from "./styles";
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { post } from '../../services/ApiClient';
import CustomBackdrop from '../../components/CustomBackdrop';
import CustomError from '../../components/CustomError';



export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const { logar } = useAuth();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [values, setValues] = useState({
        erro: '',
        carregando: false,
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    async function onSubmit(data) {
        setValues({ ...values, erro: '' });

        const { email } = data;

        if (!email.includes('@') || email.length < 3) {
            setValues({ ...values, erro: `E-mail inválido.` });
            return;
        };

        try {
            setValues({ ...values, carregando: true });
            const resposta = await post('login', data);

            setValues({ ...values, carregando: false });

            if (!resposta.ok) {
                const mensagem = await resposta.json()

                setValues({ ...values, erro: mensagem });

                return;
            };

            const { token } = await resposta.json()

            logar(token);

            history.push('/produtos');

        } catch (error) {
            setValues({ ...values, erro: error.message });
        }

    }



    return (
        <div
            className={classes.login}>
            <form
                className={classes.form}
                onSubmit={handleSubmit(onSubmit)}>
                <Typography
                    variant="h4"
                >
                    Login</Typography>
                <TextField
                    className={classes.input}
                    id="email"
                    label="E-mail"
                    {...register('email', { required: true })}
                    error={errors.email}
                    helperText={errors.email && 'Este campo é obrigatório!'}
                />
                <FormControl
                    className={classes.input}>
                    <InputLabel
                        htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        className={classes.senha}
                        id="password"
                        label="senha"
                        type={values.showPassword ? "text" : "password"}
                        {...register('senha', { required: true })}
                        error={errors.senha}
                        helperText={errors.senha && 'Este campo é obrigatório!'}
                        endAdornment={
                            <InputAdornment
                                position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Entrar
                </Button>
                <Typography variant="body2" component="p">
                    Primeira vez aqui? <Link to="/cadastro">CRIE UMA CONTA</Link>
                </Typography>
            </form>
            {values.erro && <CustomError erro={values.erro}></CustomError>}
            {values.carregando && <CustomBackdrop />}
        </div>

    );
};
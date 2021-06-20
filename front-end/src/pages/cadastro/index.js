import React, { useState } from 'react';
import useStyles from "./styles";
import Link from '@material-ui/core/Link';
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
import { useHistory } from 'react-router-dom';
import { post } from '../../services/ApiClient';
import CustomBackdrop from '../../components/CustomBackdrop';
import CustomError from '../../components/CustomError';



export default function Cadastro() {
    const classes = useStyles();
    const history = useHistory();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [values, setValues] = useState({
        sucesso: false,
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
        const { senha, senhaRepetida, email } = data;

        if (senha !== senhaRepetida) {
            setValues({ ...values, erro: `As senhas informadas devem ser iguais.` });
            return;
        };

        if (!email.includes('@') || email.length < 3) {
            setValues({ ...values, erro: `E-mail inválido.` });
            return;
        };

        try {
            setValues({ ...values, carregando: true });
            const resposta = await post('usuarios', data);

            setValues({ ...values, carregando: false });

            if (!resposta.ok) {
                const mensagem = await resposta.json()

                setValues({ ...values, erro: mensagem });

                return;
            };

            history.push('/');

        } catch (error) {
            setValues({ ...values, erro: error.message });
        };
    };


    return (
        <div className={classes.cadastro}>
            <form
                className={classes.form}
                noValidate autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}>
                    <Typography
                    variant="h4"
                    >
                    Cadastro</Typography>
                <TextField
                    className={classes.input}
                    id="nome"
                    label="Seu nome"
                    {...register('nome', { required: true })}
                    error={errors.nome}
                    helperText={errors.nome && 'Este campo é obrigatório!'}
                />

                <TextField
                    className={classes.input}
                    id="nome_loja"
                    label="Nome da Loja"
                    {...register('nome_loja', { required: true })}
                    error={errors.nome_loja}
                    helperText={errors.nome_loja && 'Este campo é obrigatório!'}
                />

                <TextField
                    className={classes.input}
                    id="email"
                    label="E-mail"
                    {...register('email', { required: true, validate: 'email' })}
                    error={errors.email}
                    helperText={errors.email && 'Este campo é obrigatório!'}
                />

                <FormControl
                    className={classes.input}>
                    <InputLabel
                    >Senha</InputLabel>
                    <Input
                        id="senha"
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

                <FormControl
                    className={classes.input}>
                    <InputLabel
                        htmlFor="standard-adornment-password">Repita a senha</InputLabel>
                    <Input
                        id="senhaRepetida"
                        label="senhaRepetida"
                        type={values.showPassword ? "text" : "password"}
                        {...register('senhaRepetida', { required: true })}
                        error={errors.senhaRepetida}
                        helperText={errors.senhaRepetida && 'Este campo é obrigatório!'}
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
                    CRIAR CONTA
                </Button>
                <Typography variant="body2" component="p">
                    Já possui uma conta? <Link href="/">ACESSE</Link>
                </Typography>
            </form>
            {values.erro && <CustomError erro={values.erro}></CustomError>}
            {values.carregando && <CustomBackdrop />}
        </div>
    );
};
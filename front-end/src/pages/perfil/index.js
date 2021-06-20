import React, { useState, useEffect } from 'react';
import useStyles from "../../components/FormStyle/styles";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, Input, FormControl, InputLabel, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { get, put } from '../../services/ApiClient';
import CustomBackdrop from '../../components/CustomBackdrop';
import CustomDrawer from '../../components/CustomDrawer';
import useAuth from '../../hooks/useAuth';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Divider from "@material-ui/core/Divider";
import CustomError from '../../components/CustomError';


export default function Perfil() {
    const classes = useStyles();
    const history = useHistory();
    const { token, deslogar } = useAuth()
    const { register, formState: { isDirty }, handleSubmit } = useForm();
    const [values, setValues] = useState({
        erro: '',
        carregando: false,
        editando: false,
        usuario: {}
    });

    if (isDirty) {
        values.editando = true;
    };


    const handleOpenEditar = () => {
        setValues({ ...values, editando: !values.editando })
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    async function onLoad() {
        try {
            const resposta = await get('perfil', token)

            setValues({ ...values, usuario: (await resposta.json()) })

        } catch (error) {
            setValues({ ...values, erro: error.message });
            return;
        }
    };


    useEffect(() => {
        setValues({ ...values, carregando: true });
        onLoad()
        setValues({ ...values, carregando: false });
    }, []);



    async function onSubmit(data) {
        setValues({ ...values, erro: '' });
        const { senha, senhaRepetida, email } = data;

        if (senha !== senhaRepetida) {
            setValues({ ...values, erro: `As senhas informadas devem ser iguais.` });
            return;
        };

        if (email && (!email.includes('@') || email.length < 3)) {
            setValues({ ...values, erro: `E-mail inválido.` });
            return;
        };

        try {
            setValues({ ...values, carregando: true });
            const resposta = await put('perfil', data, token);

            setValues({ ...values, carregando: false });

            if (!resposta.ok) {
                const mensagem = await resposta.json()

                setValues({ ...values, erro: mensagem });

                return;
            };

            deslogar()

            history.push('/perfil');

        } catch (error) {
            setValues({ ...values, erro: error.message });
            return;
        };
    }

    return (
        <div className={classes.body}>
            <CustomDrawer />
            <form className={classes.produtos} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" component="h2" className={classes.subtitulo}>
                    {values.editando ? 'Editar perfil' : 'Perfil'}
                </Typography>
                <div className={classes.main}>
                    <TextField
                        className={classes.input}
                        id="nome"
                        label="Seu nome"
                        placeholder={values.usuario.nome}
                        focused
                        {...register('nome')}
                    />
                    <TextField
                        className={classes.input}
                        id="nome_loja"
                        label="Nome da Loja"
                        {...register('nome_loja')}
                        placeholder={values.usuario.nome_loja}
                        focused
                    />
                    <TextField
                        className={classes.input}
                        id="email"
                        type="email"
                        label="E-mail"
                        {...register("email")}
                        placeholder={values.usuario.email}
                        focused
                    />

                    {values.editando &&
                        <div className={(classes.input, classes.listaInputs)}>
                            <FormControl
                                className={classes.inputNumber}>
                                <InputLabel
                                >Senha</InputLabel>
                                <Input
                                    id="senha"
                                    label="senha"
                                    type={values.showPassword ? "text" : "password"}
                                    {...register('senha')}
                                    focused
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
                                className={classes.inputNumber}>
                                <InputLabel
                                    htmlFor="standard-adornment-password">Repita a senha</InputLabel>
                                <Input
                                    id="senhaRepetida"
                                    label="senhaRepetida"
                                    type={values.showPassword ? "text" : "password"}
                                    {...register('senhaRepetida')}
                                    focused
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
                        </div>}
                </div>
                <Divider />
                <div className={classes.botoes}>
                    {values.editando &&
                        <Typography
                            className={classes.cor}>
                            <Link
                                href="/produtos">
                                CANCELAR
                            </Link>
                        </Typography>}
                    <Button
                        onClick={values.editando ? handleSubmit(onSubmit) : handleOpenEditar}
                        className={classes.background}
                        variant="contained"
                        color="primary"
                    >
                        EDITAR PERFIL
                    </Button>
                </div>
                <div className={classes.placeholder}/>
            </form>
            {values.erro && <CustomError erro={values.erro}></CustomError>}
            {values.carregando && <CustomBackdrop />}
        </div>
    );
}
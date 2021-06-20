import React, { useState } from 'react';
import useStyles from "./styles";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { post } from '../../services/ApiClient';
import CustomBackdrop from '../../components/CustomBackdrop';
import { Divider } from '@material-ui/core';
import CustomDrawer from '../../components/CustomDrawer';
import useAuth from '../../hooks/useAuth';
import CustomError from '../../components/CustomError';



export default function ProdutoNovo() {
    const classes = useStyles();
    const history = useHistory();
    const { token } = useAuth()
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [values, setValues] = useState({
        erro: '',
        carregando: false,
    });


    async function onSubmit(data) {
        setValues({ ...values, erro: '' });


        if (!data.preco.includes(',')) {
            data.preco = data.preco * 100
        } else {
            data.preco = Number(data.preco.replace(',', ''))
        };


        Number(data.estoque);

        try {
            setValues({ ...values, carregando: true });
            const resposta = await post('produtos', data, token);

            setValues({ ...values, carregando: false });

            if (!resposta.ok) {
                const mensagem = await resposta.json()

                setValues({ ...values, erro: mensagem });

                return;
            };

            history.push('/produtos');

        } catch (error) {
            setValues({ ...values, erro: error.message });
            return;
        };
    }

    return (
        <div className={classes.body}>
            <CustomDrawer />
            <form
                className={classes.produtos}
                onSubmit={handleSubmit(onSubmit)}>
                <Typography
                    variant="h4"
                    component="h2"
                    className={classes.subtitulo}>
                    Adicionar produto
                </Typography>
                <div className={classes.adicionarProduto}>
                    <TextField
                        className={classes.input}
                        id="nome"
                        label="Nome do produto"
                        {...register('nome', { required: true })}
                        error={errors.nome}
                        helperText={errors.nome && 'Este campo é obrigatório!'}
                    />
                    <div className={(classes.input, classes.listaInputs)}>
                        <Input
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            className={classes.inputNumber}
                            id="preco"
                            label="Preço"
                            {...register('preco', { required: true })}
                            type="float"
                            error={errors.preco}
                            helperText={errors.preco && 'Este campo é obrigatório!'}

                        />
                        <Input
                            startAdornment={<InputAdornment position="start">Un</InputAdornment>}
                            className={classes.inputNumber}
                            id="estoque"
                            label="Estoque"
                            {...register('estoque', { required: true })}
                            type="number"
                            error={errors.estoque}
                            helperText={errors.estoque && 'Este campo é obrigatório!'}
                        />
                    </div>
                    <TextField
                        className={classes.input}
                        id="descricao"
                        label="Descrição do produto"
                        {...register('descricao', { required: true })}
                        error={errors.descricao}
                        helperText={errors.descricao && 'Este campo é obrigatório!'}
                    />
                    <TextField
                        className={classes.input}
                        id="imagem"
                        type="url"
                        label="Imagem"
                        {...register("imagem")}

                    />
                </div>
                <Divider />
                <div className={classes.botoes}>
                    <Typography
                        className={classes.cor}>
                        <Link
                            href="/produtos">
                            CANCELAR
                        </Link>
                    </Typography>

                    <Button
                        type="submit"
                        className={classes.background}
                        variant="contained"
                        color="primary"
                    >
                        ADICIONAR PRODUTO
                    </Button>
                </div>
            </form>
            {values.erro && <CustomError erro={values.erro}></CustomError>}
            {values.carregando && <CustomBackdrop />}
        </div>
    );
};
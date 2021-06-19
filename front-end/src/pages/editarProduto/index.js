import React, { useState, useEffect } from 'react';
import useStyles from "./styles";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { put, get } from '../../services/ApiClient';
import CustomBackdrop from '../../components/CustomBackdrop';
import Alert from '@material-ui/lab/Alert';
import CustomDrawer from '../../components/CustomDrawer';
import useAuth from '../../hooks/useAuth';
import { Divider } from '@material-ui/core';



export default function EditarProduto() {
    const classes = useStyles();
    const history = useHistory();
    const { token } = useAuth()
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [values, setValues] = useState({
        id: window.location.href.split('/')[4],
        produto: {},
        erro: '',
        carregando: false,
    });

    async function onLoad() {
        try {
            const resposta = await get(`produtos/${values.id}`, token)

            setValues({ ...values, produto: (await resposta.json()) })

        } catch (error) {
            setValues({ ...values, erro: error.message });
            return;
        };
    };


    useEffect(() => {
        setValues({ ...values, carregando: true });
        onLoad()
        setValues({ ...values, carregando: false });
    }, []);


    async function onSubmit(data) {
        setValues({ ...values, erro: '' });

        data.id = values.produto.id
        data.usuario_id = values.produto.usuario_id

        if (data.preco) {
            if (!data.preco.includes(',')) {
                data.preco = data.preco * 100
            } else {
                data.preco = Number(data.preco.replace(',', ''))
            };
        } else {
            data.preco = values.produto.preco;
        };

        data.estoque = Number(data.estoque)

        console.log(data)


        try {
            setValues({ ...values, carregando: true });
            const resposta = await put(`produtos/${values.id}`, data, token);

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
            <form className={classes.produtos} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" component="h2" className={classes.subtitulo}>
                    Editar produto
                </Typography>
                <div className={classes.adicionarProduto}>
                    <TextField
                        className={classes.input}
                        id="nome"
                        label="Nome do produto"
                        placeholder={values.produto.nome}
                        focused
                        {...register('nome')}
                    />
                    <div className={(classes.input, classes.listaInputs)}>
                        <Input
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            className={classes.inputNumber}
                            id="preco"
                            label="Preço"
                            {...register('preco')}
                            placeholder={(values.produto.preco / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(`R$`, ``)}
                            focused
                            type="float"
                        />
                        <Input
                            startAdornment={<InputAdornment position="start">Un</InputAdornment>}
                            className={classes.inputNumber}
                            id="estoque"
                            label="Estoque"
                            {...register('estoque')}
                            placeholder={values.produto.estoque}
                            focused
                            type="number"
                        />
                    </div>
                    <TextField
                        className={classes.input}
                        id="descricao"
                        label="Descrição do produto"
                        {...register('descricao')}
                        placeholder={values.produto.descricao}
                        focused
                    />
                    <TextField
                        className={classes.input}
                        id="imagem"
                        type="url"
                        label="Imagem"
                        {...register("imagem")}
                        placeholder={values.produto.imagem}
                        focused
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
                        EDITAR PRODUTO
                    </Button>
                </div>
            </form>
            {values.erro && <Alert severity="error">{values.erro}</Alert>}
            {values.carregando && <CustomBackdrop />}
        </div>
    );
};
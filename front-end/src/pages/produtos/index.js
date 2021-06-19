import React, { useEffect, useState } from 'react';
import useStyles from "./styles";
import CustomDrawer from '../../components/CustomDrawer';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Alert from '@material-ui/lab/Alert';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from "@material-ui/core/Divider";
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Typography } from '@material-ui/core';
import { get } from '../../services/ApiClient';
import { useForm } from 'react-hook-form';
import CustomBackdrop from '../../components/CustomBackdrop';
import CustomDelete from '../../components/CustomDelete';

export default function Produtos() {
    const history = useHistory();
    const classes = useStyles();
    const { token } = useAuth()
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [values, setValues] = useState({
        erro: '',
        carregando: false,
        produtos: [],
    });


    async function onLoad() {

        try {
            const resposta = await get('produtos', token)

            setValues({ ...values, produtos: (await resposta.json()) })

        } catch (error) {
            setValues({ ...values, erro: error.message });
            return;
        }
    };

    function cardClick(e, id){
        e.stopPropagation();
        history.push(`/produtos/${id}/editar`);
    }


    useEffect(() => {
        setValues({ ...values, carregando: true });
        onLoad()
        setValues({ ...values, carregando: false });
    }, []);


    return (
        <div
            className={classes.body}>
            <CustomDrawer />
            <div
                className={classes.produtos}>
                <Typography
                    variant="h4"
                    component="h2"
                    className={classes.subtitulo}>
                    Seus produtos
                </Typography>
                <div
                    className={classes.listaCards}>
                    {values.produtos.map((produto) => {
                        return (
                            <Card
                                className={classes.card}
                                key={produto.id}
                                onClick={(e) => cardClick(e, produto.id)}
                            >
                                <CustomDelete
                                    id={produto.id}
                                    nome={produto.nome} />

                                <CardActionArea>
                                    <CardMedia
                                        className={classes.imagem}
                                        image={produto.imagem}
                                        title={produto.descricao}
                                    >
                                    </CardMedia>
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2">
                                            {produto.nome}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            component="p">
                                            {produto.descricao}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions
                                    className={classes.cardActions}>
                                    <Typography
                                        gutterBottom
                                        color="textSecondary"
                                        variant="body2"
                                        component="p"
                                    >
                                        {produto.estoque + " " + (produto.estoque > 1 ? "UNIDADES" : "UNIDADE")}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="body2"
                                        component="p"
                                        className={classes.preco}>
                                        {(produto.preco / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </Typography>
                                </CardActions>
                            </Card>
                        );
                    })}
                </div>
                <Divider />
                <Button
                    onClick={() => history.push(`/produtos/novo`)}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    ADICIONAR PRODUTO
                </Button>
            </div>
            {values.erro && <Alert severity="error">{values.erro}</Alert>}
            {values.carregando && <CustomBackdrop />}
        </div>
    );
}
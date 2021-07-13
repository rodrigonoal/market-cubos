const express = require('express');
const { login } = require('./controladores/login');
const usuarios = require('./controladores/usuarios');
const produtos = require('./controladores/produtos');
const verificarToken = require('./filtros/verificarToken');

const rotas = express();

rotas.post('/login', login);
rotas.post('/usuarios', usuarios.cadastrarUsuario);


rotas.use(verificarToken);

rotas.get('/perfil', usuarios.obterPerfil);
rotas.put('/perfil', usuarios.atualizarPerfil);

rotas.get('/produtos', produtos.listarProdutos);
rotas.post('/produtos', produtos.cadastrarProduto)
rotas.get('/produtos/:id', produtos.obterProduto);
rotas.put('/produtos/:id', produtos.atualizarProduto)
rotas.delete('/produtos/:id', produtos.excluirProduto);

module.exports = rotas;

const express = require('express');
const verificarCadastro = require('./filtros/verificarCadastro');
const verificarToken = require('./filtros/verificarToken');
const verificarLogin = require('./filtros/verificarLogin');
const usuario = require('./controladores/usuarios');
const login = require('./controladores/login');
const perfil = require('./controladores/perfil');
const produtos = require('./controladores/produtos');
const verificarProduto = require('./filtros/verificarProduto');
const verificarPropriedade = require('./filtros/verificarPropriedade');

const rotas = express();

rotas.post(`/usuarios`, verificarCadastro, usuario.cadastrarUsuario);
rotas.post(`/login`, verificarLogin, login.logar);

rotas.use(verificarToken);
rotas.get(`/perfil`, perfil.obterPerfil);
rotas.put(`/perfil`, verificarCadastro, perfil.atualizarPerfil);

rotas.get(`/produtos`)
rotas.post(`/produtos`, verificarProduto, produtos.cadastrarProduto)

rotas.get(`/produtos/`, produtos.listarProdutos);
rotas.use(`/produtos/:id`, verificarPropriedade);
rotas.get(`/produtos/:id`, produtos.obterProduto);
rotas.put(`/produtos/:id`, verificarProduto, produtos.atualizarProduto)
rotas.delete(`/produtos/:id`, produtos.excluirProduto);

module.exports = rotas;

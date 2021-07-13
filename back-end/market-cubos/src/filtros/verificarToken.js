const knex = require("../conexao");
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');


const verificaLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Não autorizado');
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, jwtSecret);

        const user = await knex('usuarios').where({ id }).first()

        if (user.length === 0) {
            return res.status(404).json('Usuario não encontrado');
        }

        const { senha, ...usuario } = user;

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = verificaLogin;
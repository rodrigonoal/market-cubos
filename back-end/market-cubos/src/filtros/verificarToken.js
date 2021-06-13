const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');
const conexao = require('../conexao');

const verificarToken = async (req, res, next) => {
    
    const { authorization } = req.headers;

    try {
        const token = authorization.replace('Bearer', '').trim();

        const decodificado = jwt.verify(token, jwtSecret);
        const { id, nome, email, nome_loja } = decodificado;

        const query = `select * from usuarios where id = $1 and nome = $2 and email = $3 and nome_loja = $4`;

        const usuarios = await conexao.query(query, [id, nome, email, nome_loja]);
        
        if (usuarios.rowCount === 0) {
            return res.status(400).json(`Você precisa estar logado para acessar este recurso.`); 
        };

        req.user = usuarios.rows[0]

        next();

    } catch(error){
        return res.status(400).json(error.message);
    };
};

module.exports = verificarToken;
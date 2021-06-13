const conexao = require("../conexao");

const verificarLogin = async (req, res, next) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json(`É necessário informar e-mail e senha para executar o login.`)
    };

    try {
        const query = `select email from usuarios where email = $1`
        const usuarios = await conexao.query(query, [email]);

        if (usuarios.rowCount === 0) {
            return res.status(404).json(`E-mail ou senha incorretos.`)
        }

        next();
        
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

module.exports = verificarLogin;
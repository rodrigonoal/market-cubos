const conexao = require("../conexao");

const verificarCadastro = async (req, res, next) => {
    const { nome, email, senha, nome_loja } = req.body;

    if (!nome || !email || !senha || !nome_loja) {
        return res.status(400).json(`Todos os dados devem ser preenchidos!`);
    };

    if (req.user){
        const { email: emailSalvo } = req.user;

        if (emailSalvo === email) return next();
    };

    try {
        const query = `select email from usuarios where email = $1`;
        const emailCadastrados = await conexao.query(query, [email]);

        if (emailCadastrados.rowCount > 0) {
            return res.status(400).json(`O email informado já foi cadastrado.`)
        };

    } catch (error) {
        return res.status(400).json(error.message);
    };

    next();
};

module.exports = verificarCadastro;
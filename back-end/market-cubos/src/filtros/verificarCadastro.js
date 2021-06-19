const conexao = require("../conexao");

const verificarCadastro = async (req, res, next) => {
    const { nome, email, senha, nome_loja } = req.body;

    if (req.user) {
        const { nome: nomeSalvo, nome_loja: lojaSalva, email: emailSalvo } = req.user;

        if (!nome) {
            req.body.nome = nomeSalvo;
        };
        if (!nome_loja) {
            req.body.nome_loja = lojaSalva;
        };
        if (!email) {
            req.body.email = emailSalvo;
        };
        if (emailSalvo === email || !email) {
            return next()
        };
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
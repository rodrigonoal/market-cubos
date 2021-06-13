const conexao = require("../conexao");
const securePassword = require("secure-password");

const password = securePassword();

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body;

    try {
        const query = `INSERT INTO usuarios (nome, email, senha, nome_loja) values ($1, $2, $3, $4)`;
        
        const hash = (await password.hash(Buffer.from(senha))).toString("hex");

        await conexao.query(query, [nome, email, hash, nome_loja]);
        
        return res.status(200).json(`Usuário ${nome} cadastrado com sucesso!`);

    } catch (error) {
        return res.status(400).json(`Não foi possível cadastrar novo usuário.`);
    }
};

module.exports = { cadastrarUsuario};
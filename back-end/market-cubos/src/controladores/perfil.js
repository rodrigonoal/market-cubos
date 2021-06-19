const conexao = require("../conexao");
const securePassword = require("secure-password");

const password = securePassword();

const obterPerfil = async (req, res) => {
    const { senha, ...perfil } = req.user

    res.status(200).json(perfil);
};

const atualizarPerfil = async (req, res) => {
    const { id } = req.user;
    const { nome, email, senha, nome_loja } = req.body;

    try {
        const query = `update usuarios set nome=$1, email=$2, nome_loja=$3${senha ? ', senha=$4 where id=$5' : 'where id=$4'}`;

        if (senha) {
            const hash = (await password.hash(Buffer.from(senha))).toString("hex");

            await conexao.query(query, [nome, email, nome_loja, hash, id]);
        } else {
            await conexao.query(query, [nome, email, nome_loja, id]);
        };

        return res.status(200).json(`Usuário atualizado com sucesso!`);

    } catch (error) {
        return res.status(400).json(`Não foi possível atualizar o perfil.`);
    };
};

module.exports = {
    obterPerfil,
    atualizarPerfil
};
const conexao = require("../conexao");
const securePassword = require("secure-password");
const jwt = require('jsonwebtoken');
const jwtSecret = require("../jwt_secret");

const password = securePassword();

const logar = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const query = `select * from usuarios where email = $1`
        const usuarios = await conexao.query(query, [email]);

        const dadosUsuario = usuarios.rows[0]

        const result = await password.verify(Buffer.from(senha), Buffer.from(dadosUsuario.senha, "hex"));

        switch (result) {
            case securePassword.INVALID_UNRECOGNIZED_HASH:
            case securePassword.INVALID:
                return res.status(400).json('Email ou senha incorretos.');
            case securePassword.VALID:
                break;
            case securePassword.VALID_NEEDS_REHASH:
                try {
                    const hashMelhorada = (await password.hash(Buffer.from(senha))).toString("hex");
                    const query = `update usuarios set senha = $1 where email = $2`;
                    await conexao.query(query, [hashMelhorada, email]);
                } catch {
                };
                break;
        };

        const { senha: senhaUsuario, ...usuario} = dadosUsuario

        const token = jwt.sign({
            usuario
        }, jwtSecret);

        const resposta = {
            usuario,
            token
        };

        return res.status(200).json(resposta);

    } catch (error) {
        return res.status(400).json(`Não foi possível realizar o login.`);
    };
};

module.exports = { logar }
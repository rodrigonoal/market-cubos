const knex = require("../conexao");
const securePassword = require("secure-password");
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');
const yup = require('yup');
const { setLocale } = require('yup');
const { pt } = require('yup-locales');

setLocale(pt);

const password = securePassword();

const login = async (req, res) => {
    const { email, senha } = req.body;

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        senha: yup.string().required().min(8)
    });

    try {
        await schema.validate(req.body);

        const usuario = await knex('usuarios').where({ email }).first();

        if (!usuario) {
            return res.status(400).json("O usuario não foi encontrado");
        }

        const verificarSenha = await password.verify(Buffer.from(senha), Buffer.from(usuario.senha, "hex"));

        switch (verificarSenha) {
            case securePassword.INVALID_UNRECOGNIZED_HASH:
            case securePassword.INVALID:
                return res.status(400).json('Email ou senha incorretos.');
            case securePassword.VALID:
                break;
            case securePassword.VALID_NEEDS_REHASH:
                try {
                    const hashMelhorada = (await password.hash(Buffer.from(senha))).toString("hex");
                    await knex('usuarios')
                        .update({ senha: hashMelhorada })
                        .where({ id: req.usuario.id });
                } catch {
                    return res.status(400).json(error.message);
                };
                break;
        };

        const token = jwt.sign({ id: usuario.id }, jwtSecret);

        const { senha: _, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    login
}
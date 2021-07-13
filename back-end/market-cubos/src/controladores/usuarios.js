const knex = require("../conexao");
const securePassword = require("secure-password");
const yup = require('yup');
const { setLocale } = require('yup');
const { pt } = require('yup-locales');

setLocale(pt);

const password = securePassword();

const senhaSegura = {
    condicao: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    mensagem: 'A senha deverá ter ao menos oito letras, uma maiúscula, uma minúscula, um numeral e um caractere especial.'
};

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body;
    const { condicao, mensagem } = senhaSegura
    const schema = yup.object().shape({
        nome: yup.string().required(),
        email: yup.string().email().required(),
        senha: yup.string().required().matches(condicao, mensagem),
        nome_loja: yup.string().required()
    });

    try {
        await schema.validate(req.body);

        const emailRegistrado = await knex('usuarios').where({ email }).first();

        if (emailRegistrado) {
            return res.status(400).json("O email já existe");
        }

        const hash = (await password.hash(Buffer.from(senha))).toString("hex");

        const usuario = await knex('usuarios')
            .returning('*')
            .insert({ nome, email, nome_loja, senha: `${hash}` });

        if (usuario.length === 0) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        return res.status(200).json(usuario[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterPerfil = async (req, res) => {
    return res.status(200).json(req.usuario);
}

const atualizarPerfil = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body;
    const { condicao, mensagem } = senhaSegura
    
    const schema = yup.object().shape({
        nome: yup.string(),
        email: yup.string().email(),
        senha: yup.matches(condicao, mensagem),
        nome_loja: yup.string()
    });

    if (!nome && !email && !senha && !nome_loja) {
        return res.status(404).json('É obrigatório informar ao menos um campo para atualização');
    }

    try {
        await schema.validate(req.body);

        const body = {};

        if (nome) {
            body.nome = nome;
        };

        if (email) {
            if (email !== req.usuario.email) {
                const usuarios = await knex('usuarios')
                    .where({ email })
                    .first();

                if (usuarios) {
                    return res.status(400).json("O email já existe");
                };
            };
            body.email = email;
        };

        if (senha) {
            body.senha = (await password.hash(Buffer.from(senha))).toString("hex");
        };

        if (nome_loja) {
            body.nome_loja = nome_loja;
        };

        const usuarioAtualizado = await knex('usuarios')
            .update(body)
            .where({ id: req.usuario.id });

        if (usuarioAtualizado !== 1) {
            return res.status(400).json("O usuario não foi atualizado");
        }

        return res.status(200).json('Usuario foi atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarUsuario,
    obterPerfil,
    atualizarPerfil
}

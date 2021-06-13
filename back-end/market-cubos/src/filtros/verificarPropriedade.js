const conexao = require('../conexao');

const verificarPropriedade = async (req, res, next) => {
    const { id } = req. params;
    const { id: usuarioId } = req.user;


    try {
        const existe = await conexao.query(`select * from produtos where id = $1`, [id]);


        if (existe.rowCount === 0) {
            return res.status(404).json(`O produto pesquisado não foi encontrado.`);
        };

        const pertence = await conexao.query(`select * from produtos where id = $1 and usuario_id = $2`, [id, usuarioId]);

        if (pertence.rowCount === 0) {
            return res.status(400).json(`Não é possível editar, excluir ou pesquisar produto de outro usuário.`);
        };

        next();
        
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

module.exports = verificarPropriedade;

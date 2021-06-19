const conexao = require("../conexao");

const verificarProduto = async (req, res, next) => {
    let { nome, estoque, preco, descricao, id } = req.body;

    if (id) {
        const query = `select * from produtos where id=$1`;
        const produtoSalvo = await conexao.query(query, [id]);
        const { nome: nomeSalvo, estoque: estoqueSalvo, preco: precoSalvo, descricao: descricaoSalva } = produtoSalvo.rows[0]
        req.body.nome = nome ? nome : nomeSalvo
        req.body.estoque = estoque ? estoque : estoqueSalvo
        req.body.preco = preco ? preco : precoSalvo
        req.body.descricao = descricao ? descircao : descricaoSalva
    };

    if(preco < 0 || estoque < 0) {
        return res.status(400).json(`Preço e estoque devem ser números positivos.`);
    };
    
    next();
};

module.exports = verificarProduto;
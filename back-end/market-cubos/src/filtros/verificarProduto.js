const conexao = require("../conexao");

const verificarProduto = async (req, res, next) => {
    const { nome, estoque, preco, descricao, id, imagem } = req.body;

    if (id) {
        const query = `select * from produtos where id=$1`;
        const produtoSalvo = await conexao.query(query, [id]);
        const { nome: nomeSalvo, estoque: estoqueSalvo, preco: precoSalvo, descricao: descricaoSalva, imagem: imagemSalva } = produtoSalvo.rows[0]
        req.body.nome = nome ? nome : nomeSalvo
        req.body.estoque = estoque ? estoque : estoqueSalvo
        req.body.preco = preco ? preco : precoSalvo
        req.body.descricao = descricao ? descircao : descricaoSalva
        req.body.imagem = imagem ? imagem : imagemSalva
    };

    if(req.body.preco < 0 || req.body.estoque < 0) {
        return res.status(400).json(`Preço e estoque devem ser números positivos.`);
    };
    
    next();
};

module.exports = verificarProduto;
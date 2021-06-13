const verificarProduto = async (req, res, next) => {
    const { nome, estoque, preco, descricao } = req.body;

    if(!nome|| !estoque|| !preco|| !descricao) {
        return res.status(400).json(`Nome, estoque, preço e descrição devem ser preenchidos.`);
    };
    
    next();
};

module.exports = verificarProduto;
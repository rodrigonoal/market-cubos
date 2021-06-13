const conexao = require("../conexao");

const cadastrarProduto = async (req, res) => {
    const { id: usuario_id, nome_loja } = req.user;
    const { nome, estoque, preco, descricao, categoria, imagem } = req.body;

    try {
        const query = `insert into produtos (nome, estoque, preco, descricao, categoria, imagem, usuario_id) values ($1, $2, $3, $4, $5, $6, $7)`;
        await conexao.query(query, [nome, estoque, preco, descricao, categoria, imagem, usuario_id]);

        return res.status(200).json(`O produto ${nome} foi cadastrado na loja: ${nome_loja}`);

    } catch (error) {
        return res.status(400).json(`Não foi possível cadastrar o produto.`);
    };
};

const listarProdutos = async (req, res) => {
    const { id } = req.user;

    try {
        const query = `select * from produtos where usuario_id = $1 group by categoria, id order by preco`;

        const { rows: produtos} = await conexao.query(query, [id]);

        return res.status(400).json(produtos)

    } catch (error) {
        return res.status(400).json(`Não foi possível listar os produtos.`);
    };
};

const obterProduto = async(req, res) => {
    const { id } = req.params;

    try {
        const query = `select * from produtos where id=$1`

        const { rows: produto } = await conexao.query(query, [id]);

        return res.status(200).json(produto[0])
        
    } catch (error) {
        return res.status(400).json(`Não foi possível obter o produto.`);
    };
};

const atualizarProduto = async(req, res) => {
    const { id } = req.params;
    const { nome, estoque, preco, descricao, categoria, imagem } = req.body;

    try {
        const query = `update produtos set nome = $1, estoque = $2, preco = $3, descricao = $4, categoria = $5, imagem = $6 where id = $7`

        await conexao.query(query, [nome, estoque, preco, descricao, categoria, imagem, id]);

        return res.status(200).json(`Produto atualizado com sucesso!`);

    } catch (error) {
        return res.status(400).json(`Não foi possível atualizar o produto.`);
    };
};


const excluirProduto = async(req, res) => {
    const { id } = req.params;

    try {
        const query = `delete from produtos where id =$1`
        await conexao.query(query, [id]);

        return res.status(200).json(`Produto excluído com sucesso!`);

    } catch (error) {
        return res.status(400).json(`Não foi possível excluir o produto.`);
    };

};

module.exports = {
    cadastrarProduto,
    listarProdutos,
    obterProduto,
    atualizarProduto,
    excluirProduto
}
const knex = require("./dbConnection");

const getProducts = async (req, res) => {
  try {
    const products = await knex("products")
      .returning("*");

    if (!products) {
      return res
        .status(500)
        .json({message: "Não foi possível exibir os produtos, tente novamente mais tarde."});
    }
    return res.status(201).json(products);
  } catch (error) {
    return res.status(500).json(error.message);
  }

}

const getProductById = async (req, res) => {
  const {id} = req.params;

  try {
    const searchProduct = await knex("products").where({ id }).first();

    if (!searchProduct) {
      return res.status(404).json({message: "Produto não encontrado!"});
    }
    return res.status(201).json(searchProduct);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

const addProduct = async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res
      .status(400)
      .json({message: "O nome e o preço do produto são obrigatórios."});
  }

  try {
    const newProduct = await knex("products")
      .insert({ name, price })
      .returning("*");

    if (!newProduct) {
      return res
        .status(500)
        .json({message: "Não foi possível cadastrar o produto, tente mais tarde."});
    }
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};


const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({message: "O nome e o preço do produto são obrigatórios."});
  }

  try {
    const searchProduct = await knex("products").where({ id }).first();

    if (!searchProduct) {
      return res.status(400).json({message: "Produto não encontrado!"});
    }

    if (name) {
      req.body.name = name;
    }

    if (price) {
      req.body.price = price;
    }

    const editProduct = await knex("products")
      .update({ name, price })
      .where({ id });

    if (!editProduct) {
      return res
        .status(500)
        .json({message: "Não foi possível atualizar o produto, tente mais tarde."});
    }
    return res.status(201).send();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

  try {
    const searchProduct = await knex("products").where({ id }).first();

    if (!searchProduct) {
      return res.status(404).json("Produto não encontrado!");
    }

    const deleteProduct = await knex("products").del().where({ id });

    if (!deleteProduct) {
      return res
        .status(500)
        .json({message: "Não foi possível excluir o produto, tente mais tarde."});
    }
    return res.status(200).json({message: "Produto excluído com sucesso!"});
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
};

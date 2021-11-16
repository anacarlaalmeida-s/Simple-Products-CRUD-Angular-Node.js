const express = require("express");
const products = require("./products");

const routes = express();

routes.get("/products", products.getProducts);
routes.get("/products/:id", products.getProductById);
routes.post("/products", products.addProduct);
routes.put("/products/:id", products.editProduct);
routes.delete("/products/:id", products.deleteProduct);

module.exports = routes;



const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
app.use(cors());
app.use(express.json());
const usuarioRouter=require("./routers/usuario.router");
const productoRouter=require("./routers/producto.router");
const categoriaRouter=require("./routers/categoria.router");
const pedidoRouter=require("./routers/pedido.router");

app.use("/usuarios",usuarioRouter);
app.use("/productos",productoRouter);
app.use("/categorias",categoriaRouter);
app.use("/pedidos",pedidoRouter);

module.exports = app;
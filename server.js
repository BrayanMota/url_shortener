const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const urlRoutes = require("./routes/urlRoutes");

const app = express();
app.use(bodyParser.json());

// Conexão com o banco de dados
mongoose.connect("mongodb://localhost/url-shortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware para as rotas
app.use("/api", urlRoutes);

// Inicia o servidor
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

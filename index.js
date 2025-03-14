const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose"); // 🔥 Importação do mongoose

const app = express();

app.use(express.json());
app.use(helmet()); // 🛠 Corrigido: "helment()" -> "helmet()"
app.use(morgan("combined"));

// 🔥 Conectando ao MongoDB antes de definir o schema
const urldb = "mongodb+srv://senac:123senac@projetoestudo.exh7t.mongodb.net/?retryWrites=true&w=majority&appName=ProjetoEstudo";

mongoose.connect(urldb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB conectado com sucesso!"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

const schema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  cpf: { type: String, unique: true, required: true },
  telefone: { type: String },
  idade: { type: Number, min: 16, max: 120 },
  usuario: { type: String, unique: true },
  senha: { type: String },
  datacadastro: { type: Date, default: Date.now }
});

const Cliente = mongoose.model("Cliente", schema);

app.get("/", (req, res) => {
  res.status(200).send({ mensagem: "Você está no verbo GET" });
});

app.post("/cadastro", (req, res) => {
  res.status(201).send({ mensagem: "Você está no verbo POST", payload: req.body });
});

app.put("/atualizar/:id", (req, res) => {
  res.status(200).send({
    mensagem: "Você está no verbo PUT",
    id: req.params.id,
    payload: req.body,
  });
});

app.delete("/apagar/:id", (req, res) => {
  res.status(204).send({});
});

app.use((req, res) => {
  res.type("application/json");
  res.status(404).send("404 Not Found");
});

app.listen(3000, () => console.log(`Servidor on-line em http://localhost:3000`));

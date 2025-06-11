const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

const sistema = require("./sistema");

// Rotas de clientes
app.get("/clientes", (req, res) => {
  res.json(sistema.listarClientes());
});

app.get("/clientes/:id", (req, res) => {
  const cliente = sistema.buscarClientePorId(parseInt(req.params.id));
  if (!cliente) return res.status(404).send({ message: "Cliente não encontrado" });
  res.json(cliente);
});

app.post("/clientes", (req, res) => {
  const { nome, lanches } = req.body;

  if (!nome || !Array.isArray(lanches) || lanches.length < 1 || lanches.length > 3) {
    return res.status(400).send({ message: "Cliente deve ter de 1 a 3 lanches." });
  }

  const resultado = sistema.adicionarCliente(nome, lanches);
  if (resultado.erro) {
    return res.status(400).send({ message: `Lanches inválidos: ${resultado.erro.join(", ")}` });
  }

  res.status(201).json(resultado);
});

app.put("/clientes/:id", (req, res) => {
  const { nome, lanches } = req.body;

  const resultado = sistema.atualizarCliente(parseInt(req.params.id), nome, lanches);
  if (!resultado) return res.status(404).send({ message: "Cliente não encontrado" });
  if (resultado.erro) {
    return res.status(400).send({ message: `Lanches inválidos: ${resultado.erro.join(", ")}` });
  }

  res.json(resultado);
});

app.delete("/clientes/:id", (req, res) => {
  const sucesso = sistema.removerCliente(parseInt(req.params.id));
  if (!sucesso) return res.status(404).send({ message: "Cliente não encontrado" });
  res.send({ message: "Cliente removido com sucesso." });
});

// Rotas de lanches
app.get("/lanches", (req, res) => {
  res.json(sistema.listarLanches());
});

app.post("/lanches", (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).send({ message: "Nome do lanche é obrigatório." });
  res.status(201).json(sistema.adicionarLanche(nome));
});

app.put("/lanches/:id", (req, res) => {
  const { nome } = req.body;
  const lanche = sistema.atualizarLanche(parseInt(req.params.id), nome);
  if (!lanche) return res.status(404).send({ message: "Lanche não encontrado" });
  res.json(lanche);
});

app.delete("/lanches/:id", (req, res) => {
  const sucesso = sistema.removerLanche(parseInt(req.params.id));
  if (!sucesso) return res.status(404).send({ message: "Lanche não encontrado" });
  res.send({ message: "Lanche removido com sucesso." });
});

// Inicialização
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

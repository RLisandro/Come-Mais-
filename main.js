const express = require("express");

const app = express();
app.use(express.json());

let clientes = [];
let proximoId = 1;
const lanchesDisponiveis = [
  "Hambúrguer",
  "Pizza",
  "Cachorro-quente",
  "Pastel",
  "Coxinha",
  "Sanduíche"
];

function validarLanches(lanchesSelecionados) {
  const lanchesInvalidos = lanchesSelecionados.filter(
    (lanche) => !lanchesDisponiveis.includes(lanche)
  );
  return lanchesInvalidos.length === 0 ? true : lanchesInvalidos;
}

app.get("/", (req, res) => {
  console.log("Rota / acessada!");
  res.json({
    message: "Lista de clientes cadastrados.",
    clientes: clientes.map((cliente) => ({
      nome: cliente.nome,
      lanches: cliente.lanches
    })),
    lanchesDisponiveis
  });
});

app.get("/clientes/:id", (req, res) => {
  const clienteIndex = clientes.findIndex(
    (cliente) => cliente.id === parseInt(req.params.id)
  );
  if (clienteIndex === -1) {
    return res.status(404).send({ message: "Cliente não encontrado" });
  }
  res.json(clientes[clienteIndex]);
});

app.post("/clientes", (req, res) => {
  const { nome, lanches } = req.body;

  if (
    !nome ||
    !Array.isArray(lanches) ||
    lanches.length === 0 ||
    lanches.length > 3
  ) {
    return res.status(400).send({
      message: "Nome é obrigatório e o cliente deve escolher de 1 a 3 lanches."
    });
  }

  const lanchesInvalidos = validarLanches(lanches);
  if (lanchesInvalidos !== true) {
    return res.status(400).send({
      message: `Os seguintes lanches são inválidos: ${lanchesInvalidos.join(
        ", "
      )}`
    });
  }

  const novoCliente = { id: proximoId++, nome, lanches };
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

app.put("/clientes/:id", (req, res) => {
  const clienteId = parseInt(req.params.id);
  const { nome, lanches } = req.body;
  const clienteIndex = clientes.findIndex((cliente) => cliente.id === clienteId);

  if (clienteIndex === -1) {
    return res.status(404).send({ message: "Cliente não encontrado" });
  }

  if (
    !nome ||
    !Array.isArray(lanches) ||
    lanches.length === 0 ||
    lanches.length > 3
  ) {
    return res.status(400).send({
      message: "Nome é obrigatório e o cliente deve escolher de 1 a 3 lanches."
    });
  }

  const lanchesInvalidos = validarLanches(lanches);
  if (lanchesInvalidos !== true) {
    return res.status(400).send({
      message: `Os seguintes lanches são inválidos: ${lanchesInvalidos.join(
        ", "
      )}`
    });
  }

  clientes[clienteIndex] = { id: clienteId, nome, lanches };
  res.json(clientes[clienteIndex]);
});

app.delete("/clientes/:id", (req, res) => {
  const clienteId = parseInt(req.params.id);
  const clienteIndex = clientes.findIndex((cliente) => cliente.id === clienteId);

  if (clienteIndex === -1) {
    return res.status(404).send({ message: "Cliente não encontrado" });
  }

  clientes.splice(clienteIndex, 1);
  res.status(200).send({ message: "Cliente excluído com sucesso." });
});

const PORT = 3000; // Escolha a porta desejada

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { app, clientes, proximoId };
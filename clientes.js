const {
  validarLanchesSelecionados
} = require("./lanches");

let clientes = [];
let proximoId = 1;

function listarClientes() {
  return clientes;
}

function buscarClientePorId(id) {
  return clientes.find(c => c.id === id);
}

function adicionarCliente(nome, lanches) {
  const validacao = validarLanchesSelecionados(lanches);
  if (validacao !== true) return { erro: validacao };

  const novo = { id: proximoId++, nome, lanches };
  clientes.push(novo);
  return novo;
}

function atualizarCliente(id, nome, lanches) {
  const cliente = clientes.find(c => c.id === id);
  if (!cliente) return null;

  const validacao = validarLanchesSelecionados(lanches);
  if (validacao !== true) return { erro: validacao };

  cliente.nome = nome;
  cliente.lanches = lanches;
  return cliente;
}

function removerCliente(id) {
  const index = clientes.findIndex(c => c.id === id);
  if (index === -1) return false;
  clientes.splice(index, 1);
  return true;
}

module.exports = {
  listarClientes,
  buscarClientePorId,
  adicionarCliente,
  atualizarCliente,
  removerCliente
};

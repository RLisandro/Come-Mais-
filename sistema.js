const clientes = require("./clientes");
const lanches = require("./lanches");

module.exports = {
  // CLIENTES
  listarClientes: clientes.listarClientes,
  buscarClientePorId: clientes.buscarClientePorId,
  adicionarCliente: clientes.adicionarCliente,
  atualizarCliente: clientes.atualizarCliente,
  removerCliente: clientes.removerCliente,

  // LANCHES
  listarLanches: lanches.listarLanches,
  adicionarLanche: lanches.adicionarLanche,
  atualizarLanche: lanches.atualizarLanche,
  removerLanche: lanches.removerLanche,

  // VALIDAÇÃO COMPARTILHADA
  validarLanchesSelecionados: lanches.validarLanchesSelecionados
};

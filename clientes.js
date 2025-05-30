const lanches = require("./lanches");

module.exports = (() => {
  let clientes = [];
  let proximoId = 1;

  function listarClientes() {
    return clientes;
  }

  function buscarClientePorId(id) {
    return clientes.find(c => c.id === id);
  }

  function adicionarCliente(nome, lanchesSelecionados) {
    const validacao = lanches.validarSelecionados(lanchesSelecionados);
    if (validacao !== true) return { erro: validacao };

    const novo = { id: proximoId++, nome, lanches: lanchesSelecionados };
    clientes.push(novo);
    return novo;
  }

  function atualizarCliente(id, nome, lanchesSelecionados) {
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return null;

    const validacao = lanches.validarSelecionados(lanchesSelecionados);
    if (validacao !== true) return { erro: validacao };

    cliente.nome = nome;
    cliente.lanches = lanchesSelecionados;
    return cliente;
  }

  function removerCliente(id) {
    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) return false;
    clientes.splice(index, 1);
    return true;
  }

  return {
    listarClientes,
    buscarClientePorId,
    adicionarCliente,
    atualizarCliente,
    removerCliente
  };
})();

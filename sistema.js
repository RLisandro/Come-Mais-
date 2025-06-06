const { ValidadorRestrito } = require("./strategies/validadorStrategy");
const ObserverManager = require("./observer/observerManager");
const { LogClienteObserver } = require("./observer/clienteObserver");

class Sistema {
  constructor(validador) {
    this.clientes = [];

    // 🔹 Lanches iniciais do cardápio
    this.lanches = [
      { id: 1, nome: "Hambúrguer" },
      { id: 2, nome: "Pizza" },
      { id: 3, nome: "Cachorro-quente" },
      { id: 4, nome: "Pastel" },
      { id: 5, nome: "Coxinha" },
      { id: 6, nome: "Sanduíche" }
    ];

    this.validador = validador;
    this.proximoIdCliente = 1;
    this.proximoIdLanche = 7;

    this.observerManager = new ObserverManager();
    this.observerManager.adicionar(new LogClienteObserver());
  }

  // ---------- CLIENTES ----------
  listarClientes() {
    return this.clientes;
  }

  buscarClientePorId(id) {
    return this.clientes.find(c => c.id === id);
  }

  adicionarCliente(nome, lanches) {
    const validacao = this.validador.validar(lanches, this.lanches.map(l => l.nome));
    if (validacao.erro) return { erro: validacao.erro };

    const cliente = {
      id: this.proximoIdCliente++,
      nome,
      lanches
    };
    this.clientes.push(cliente);
    this.observerManager.notificar("cliente_adicionado", cliente);
    return cliente;
  }

  atualizarCliente(id, nome, lanches) {
    const cliente = this.buscarClientePorId(id);
    if (!cliente) return null;

    const validacao = this.validador.validar(lanches, this.lanches.map(l => l.nome));
    if (validacao.erro) return { erro: validacao.erro };

    cliente.nome = nome;
    cliente.lanches = lanches;
    this.observerManager.notificar("cliente_atualizado", cliente);
    return cliente;
  }

  removerCliente(id) {
    const index = this.clientes.findIndex(c => c.id === id);
    if (index === -1) return false;
    const [clienteRemovido] = this.clientes.splice(index, 1);
    this.observerManager.notificar("cliente_removido", clienteRemovido);
    return true;
  }

  // ---------- LANCHES ----------
  listarLanches() {
    return this.lanches;
  }

  adicionarLanche(nome) {
    const lanche = { id: this.proximoIdLanche++, nome };
    this.lanches.push(lanche);
    this.observerManager.notificar("lanche_adicionado", lanche);
    return lanche;
  }

  atualizarLanche(id, nome) {
    const lanche = this.lanches.find(l => l.id === id);
    if (!lanche) return null;
    lanche.nome = nome;
    this.observerManager.notificar("lanche_atualizado", lanche);
    return lanche;
  }

  removerLanche(id) {
    const index = this.lanches.findIndex(l => l.id === id);
    if (index === -1) return false;
    const removido = this.lanches.splice(index, 1)[0];
    this.observerManager.notificar("lanche_removido", removido);
    return true;
  }
}

module.exports = new Sistema(new ValidadorRestrito());

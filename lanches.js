const ObserverManager = require("./observer/observerManager");
const { LogClienteObserver } = require("./observer/clienteObserver");

module.exports = (() => {
  let lanches = [
    { id: 1, nome: "Hambúrguer" },
    { id: 2, nome: "Pizza" },
    { id: 3, nome: "Cachorro-quente" },
    { id: 4, nome: "Pastel" },
    { id: 5, nome: "Coxinha" },
    { id: 6, nome: "Sanduíche" }
  ];
  let proximoId = 7;

  const observerManager = new ObserverManager();
  observerManager.adicionar(new LogClienteObserver());

  function listarLanches() {
    return lanches;
  }

  function listarNomesLanches() {
    return lanches.map(l => l.nome);
  }

  function adicionarLanche(nome) {
    const novo = { id: proximoId++, nome };
    lanches.push(novo);
    observerManager.notificar("lanche_adicionado", novo);
    return novo;
  }

  function removerLanche(id) {
    const index = lanches.findIndex(l => l.id === id);
    if (index === -1) return false;
    const removido = lanches.splice(index, 1)[0];
    observerManager.notificar("lanche_removido", removido);
    return true;
  }

  return {
    listarLanches,
    listarNomesLanches,
    adicionarLanche,
    removerLanche
  };
})();

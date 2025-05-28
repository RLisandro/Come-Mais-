let lanches = [
  { id: 1, nome: "Hambúrguer" },
  { id: 2, nome: "Pizza" },
  { id: 3, nome: "Cachorro-quente" },
  { id: 4, nome: "Pastel" },
  { id: 5, nome: "Coxinha" },
  { id: 6, nome: "Sanduíche" }
];
let proximoId = 7;

function listarLanches() {
  return lanches;
}

function adicionarLanche(nome) {
  const novo = { id: proximoId++, nome };
  lanches.push(novo);
  return novo;
}

function atualizarLanche(id, nome) {
  const lanche = lanches.find(l => l.id === id);
  if (!lanche) return null;
  lanche.nome = nome;
  return lanche;
}

function removerLanche(id) {
  const index = lanches.findIndex(l => l.id === id);
  if (index === -1) return false;
  lanches.splice(index, 1);
  return true;
}

function validarLanchesSelecionados(selecionados) {
  const nomes = lanches.map(l => l.nome);
  const invalidos = selecionados.filter(nome => !nomes.includes(nome));
  return invalidos.length === 0 ? true : invalidos;
}

module.exports = {
  listarLanches,
  adicionarLanche,
  atualizarLanche,
  removerLanche,
  validarLanchesSelecionados
};

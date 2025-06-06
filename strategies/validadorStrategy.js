class ValidadorStrategy {
    validar(lanches, lanchesDisponiveis) {
      throw new Error("Método 'validar' precisa ser implementado.");
    }
  }
  
  class ValidadorSimples extends ValidadorStrategy {
    validar(lanches, lanchesDisponiveis) {
      const lanchesInvalidos = lanches.filter(l => !lanchesDisponiveis.includes(l));
      return lanchesInvalidos.length > 0 ? { erro: lanchesInvalidos } : { sucesso: true };
    }
  }
  
  class ValidadorRestrito extends ValidadorStrategy {
    validar(lanches, lanchesDisponiveis) {
      if (lanches.length < 1 || lanches.length > 3) {
        return { erro: ["Quantidade de lanches fora do permitido"] };
      }
      const lanchesInvalidos = lanches.filter(l => !lanchesDisponiveis.includes(l));
      return lanchesInvalidos.length > 0 ? { erro: lanchesInvalidos } : { sucesso: true };
    }
  }
  
  module.exports = { ValidadorSimples, ValidadorRestrito };
  
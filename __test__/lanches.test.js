const {
  listarLanches,
  adicionarLanche,
  atualizarLanche,
  removerLanche
} = require("../lanches");

describe("CRUD de Lanches", () => {
  test("Listar lanches padrão", () => {
    const lanches = listarLanches();
    expect(lanches.length).toBeGreaterThan(0);
  });

  test("Adicionar novo lanche", () => {
    const novo = adicionarLanche("Tapioca");
    expect(novo.nome).toBe("Tapioca");
  });

  test("Atualizar lanche existente", () => {
    const novo = adicionarLanche("X-Tudo");
    const atualizado = atualizarLanche(novo.id, "X-Egg");
    expect(atualizado.nome).toBe("X-Egg");
  });

  test("Remover lanche existente", () => {
    const novo = adicionarLanche("Empada");
    const sucesso = removerLanche(novo.id);
    expect(sucesso).toBe(true);
  });
});

const {
  adicionarCliente,
  listarClientes,
  buscarClientePorId,
  atualizarCliente,
  removerCliente
} = require("../clientes");

describe("CRUD de Clientes", () => {
  beforeEach(() => {
    // Resetando o estado para evitar interferência entre testes
    while (listarClientes().length > 0) {
      removerCliente(listarClientes()[0].id);
    }
  });

  test("Adicionar cliente com lanches válidos", () => {
    const cliente = adicionarCliente("Ana", ["Pizza", "Coxinha"]);
    expect(cliente.nome).toBe("Ana");
    expect(cliente.lanches).toContain("Pizza");
  });

  test("Não deve adicionar cliente com lanche inválido", () => {
    const resultado = adicionarCliente("Carlos", ["Sorvete"]);
    expect(resultado.erro).toBeDefined();
  });

  test("Buscar cliente por ID existente", () => {
    const cliente = adicionarCliente("Maria", ["Pizza"]);
    const encontrado = buscarClientePorId(cliente.id);
    expect(encontrado.nome).toBe("Maria");
  });

  test("Atualizar cliente existente", () => {
    const cliente = adicionarCliente("José", ["Pastel"]);
    const atualizado = atualizarCliente(cliente.id, "Zé", ["Hambúrguer"]);
    expect(atualizado.nome).toBe("Zé");
    expect(atualizado.lanches).toContain("Hambúrguer");
  });

  test("Remover cliente existente", () => {
    const cliente = adicionarCliente("Laura", ["Pizza"]);
    const sucesso = removerCliente(cliente.id);
    expect(sucesso).toBe(true);
    expect(buscarClientePorId(cliente.id)).toBeUndefined();
  });
});

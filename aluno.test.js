const request = require("supertest");
const { app, clientes, proximoId } = require("../main");
// Importar o arquivo do servidor

describe("Testes da API de Clientes", () => {
  let currentId = 1; // Usar uma variável local para controlar o ID

  beforeEach(() => {
    // Resetar a lista de clientes e o ID antes de cada teste
    clientes.length = 0;
    currentId = 1;
  });

  it("GET / deve retornar a lista de clientes e lanches disponíveis", async () => {
    console.log("Iniciando teste GET /"); // Adicione este log
    try {
      const response = await request(app).get("/");
      console.log("Resposta recebida:", response.statusCode, response.body); // Adicione este log
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe(
        "Lista de clientes cadastrados." // <--- CORREÇÃO AQUI
      );
      expect(Array.isArray(response.body.clientes)).toBe(true);
      expect(Array.isArray(response.body.lanchesDisponiveis)).toBe(true);
      expect(response.body.lanchesDisponiveis).toEqual([
        "Hambúrguer",
        "Pizza",
        "Cachorro-quente",
        "Pastel",
        "Coxinha",
        "Sanduíche"
      ]);
      console.log("Teste GET / finalizado com sucesso (aparente)"); // Adicione este log
    } catch (error) {
      console.error("Erro no teste GET /:", error);
      throw error; // Re-lança o erro para o Jest reportar
    }
  });

  it("GET /clientes/:id deve retornar um cliente específico", async () => {
    const clienteTeste = {
      id: currentId++,
      nome: "João",
      lanches: ["Hambúrguer"]
    };
    clientes.push(clienteTeste);
    const response = await request(app).get(`/clientes/${clienteTeste.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(clienteTeste);
  });

  it("GET /clientes/:id deve retornar 404 para um cliente não encontrado", async () => {
    const response = await request(app).get("/clientes/99");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Cliente não encontrado" });
  });

  it("POST /clientes deve adicionar um novo cliente", async () => {
    const novoCliente = { nome: "Maria", lanches: ["Pizza", "Sanduíche"] };
    const response = await request(app)
      .post("/clientes")
      .send(novoCliente)
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe(novoCliente.nome);
    expect(response.body.lanches).toEqual(novoCliente.lanches);
    expect(clientes.length).toBe(1);
    expect(clientes[0]).toEqual({ id: 1, ...novoCliente });
    // Não precisamos incrementar proximoId aqui, pois o beforeEach já o reseta
  });

  it("POST /clientes deve retornar 400 para dados inválidos (sem nome)", async () => {
    const response = await request(app)
      .post("/clientes")
      .send({ lanches: ["Hambúrguer"] })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Nome é obrigatório e o cliente deve escolher de 1 a 3 lanches."
    });
    expect(clientes.length).toBe(0);
  });

  it("POST /clientes deve retornar 400 para dados inválidos (mais de 3 lanches)", async () => {
    const response = await request(app)
      .post("/clientes")
      .send({
        nome: "Carlos",
        lanches: ["Hambúrguer", "Pizza", "Cachorro-quente", "Pastel"]
      })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Nome é obrigatório e o cliente deve escolher de 1 a 3 lanches."
    });
    expect(clientes.length).toBe(0);
  });

  it("POST /clientes deve retornar 400 para lanche inválido", async () => {
    const response = await request(app)
      .post("/clientes")
      .send({ nome: "Ana", lanches: ["Lasanha"] })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Os seguintes lanches são inválidos: Lasanha" // Correção aqui
    });
    expect(clientes.length).toBe(0);
  });

  it("PUT /clientes/:id deve atualizar um cliente existente", async () => {
    const clienteOriginal = {
      id: currentId++,
      nome: "Pedro",
      lanches: ["Coxinha"]
    };
    clientes.push(clienteOriginal);
    const clienteAtualizado = {
      nome: "Pedro Henrique",
      lanches: ["Sanduíche", "Pastel"]
    };
    const response = await request(app)
      .put(`/clientes/${clienteOriginal.id}`)
      .send(clienteAtualizado)
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: clienteOriginal.id, ...clienteAtualizado });
    expect(clientes.length).toBe(1);
    expect(clientes[0]).toEqual({ id: clienteOriginal.id, ...clienteAtualizado });
  });

  it("PUT /clientes/:id deve retornar 404 para cliente não encontrado", async () => {
    const response = await request(app)
      .put("/clientes/99")
      .send({ nome: "Teste", lanches: ["Hambúrguer"] })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Cliente não encontrado" });
  });

  it("PUT /clientes/:id deve retornar 400 para dados inválidos (sem nome)", async () => {
    const clienteOriginal = {
      id: currentId++,
      nome: "Carla",
      lanches: ["Pastel"]
    };
    clientes.push(clienteOriginal);
    const response = await request(app)
      .put(`/clientes/${clienteOriginal.id}`)
      .send({ lanches: ["Esfiha"] })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Nome é obrigatório e o cliente deve escolher de 1 a 3 lanches."
    });
  });

  it("PUT /clientes/:id deve retornar 400 para dados inválidos (mais de 3 lanches)", async () => {
    const clienteOriginal = {
      id: currentId++,
      nome: "Carla",
      lanches: ["Pastel"]
    };
    clientes.push(clienteOriginal);
    const response = await request(app)
      .put(`/clientes/${clienteOriginal.id}`)
      .send({
        nome: "Carla",
        lanches: ["Esfiha", "Kibe", "Enroladinho", "Bolinha de Queijo"]
      })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Nome é obrigatório e o cliente deve escolher de 1 a 3 lanches."
    });
  });

  it("PUT /clientes/:id deve retornar 400 para lanche inválido", async () => {
    const clienteOriginal = {
      id: currentId++,
      nome: "Carla",
      lanches: ["Pastel"]
    };
    clientes.push(clienteOriginal);
    const response = await request(app)
      .put(`/clientes/${clienteOriginal.id}`)
      .send({ nome: "Carla", lanches: ["Feijoada"] })
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: "Os seguintes lanches são inválidos: Feijoada" // Correção aqui
    });
  });
  it("DELETE /clientes/:id deve excluir um cliente existente", async () => {
    const clienteParaExcluir = {
      id: currentId++,
      nome: "Mariana",
      lanches: ["Pizza"]
    };
    clientes.push(clienteParaExcluir);
    const response = await request(app).delete(
      `/clientes/${clienteParaExcluir.id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Cliente excluído com sucesso."
    });
    expect(clientes.length).toBe(0);
  });

  it("DELETE /clientes/:id deve retornar 404 para cliente não encontrado", async () => {
    const response = await request(app).delete("/clientes/99");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Cliente não encontrado" });
  });
});
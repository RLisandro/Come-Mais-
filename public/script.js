const BASE_URL = "http://localhost:3000";

// Elementos principais
const formLanche = document.getElementById("form-lanche");
const formCliente = document.getElementById("form-cliente");

const listaLanches = document.getElementById("lista-lanches");
const listaClientes = document.getElementById("lista-clientes");
const listaCardapio = document.getElementById("lista-cardapio");

const selectLanches = document.getElementById("cliente-lanches");

// Abas
const tabClientes = document.getElementById("tab-clientes");
const tabLanches = document.getElementById("tab-lanches");
const tabCardapio = document.getElementById("tab-cardapio");

const secClientes = document.getElementById("clientes-section");
const secLanches = document.getElementById("lanches-section");
const secCardapio = document.getElementById("cardapio-section");

// Troca de abas
function ativarAba(tab, sec) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  tab.classList.add("active");
  sec.classList.add("active");
}

tabClientes.addEventListener("click", () => ativarAba(tabClientes, secClientes));
tabLanches.addEventListener("click", () => ativarAba(tabLanches, secLanches));
tabCardapio.addEventListener("click", () => ativarAba(tabCardapio, secCardapio));

// Formulário de Lanches
formLanche.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("lanche-nome").value.trim();

  if (!nome) {
    alert("Digite o nome do lanche.");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/lanches`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome })
    });

    const data = await res.json();
    if (res.ok) {
      formLanche.reset();
      carregarLanches();
      carregarCardapio();
    } else {
      alert(data.message || "Erro ao adicionar lanche.");
    }
  } catch (err) {
    alert("Erro de conexão com o servidor.");
  }
});

// Formulário de Clientes
formCliente.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("cliente-nome").value.trim();
  const lanchesSelecionados = Array.from(selectLanches.selectedOptions).map(o => o.value);

  if (!nome || lanchesSelecionados.length < 1 || lanchesSelecionados.length > 3) {
    alert("Informe o nome e selecione entre 1 e 3 lanches.");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/clientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, lanches: lanchesSelecionados })
    });

    const data = await res.json();

    if (res.ok) {
      formCliente.reset();
      carregarClientes();
    } else {
      alert(data.message || "Erro ao adicionar cliente.");
    }
  } catch (err) {
    alert("Erro de conexão com o servidor.");
  }
});

// Carregar Lanches
async function carregarLanches() {
  try {
    const res = await fetch(`${BASE_URL}/lanches`);
    const lanches = await res.json();
    listaLanches.innerHTML = "";
    selectLanches.innerHTML = "";

    lanches.forEach((lanche) => {
      const li = document.createElement("li");
      li.className = "card";
      li.innerHTML = `
        <h3>${lanche.nome}</h3>
        <p><strong>ID:</strong> ${lanche.id}</p>
        <div class="acoes">
          <button class="btn btn-delete" onclick="removerLanche(${lanche.id})">
            <i class="fas fa-trash"></i> Remover
          </button>
        </div>
      `;
      listaLanches.appendChild(li);

      const opt = document.createElement("option");
      opt.value = lanche.nome;
      opt.textContent = lanche.nome;
      selectLanches.appendChild(opt);
    });
  } catch (err) {
    alert("Erro ao carregar lanches.");
  }
}

async function removerLanche(id) {
  if (!confirm("Deseja remover este lanche?")) return;
  const res = await fetch(`${BASE_URL}/lanches/${id}`, { method: "DELETE" });
  if (res.ok) {
    carregarLanches();
    carregarCardapio();
  } else alert("Erro ao remover lanche.");
}

// Carregar Clientes
async function carregarClientes() {
  const res = await fetch(`${BASE_URL}/clientes`);
  const clientes = await res.json();
  listaClientes.innerHTML = "";

  clientes.forEach((cliente) => {
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `
      <h3>${cliente.nome}</h3>
      <p><strong>Lanches:</strong> ${cliente.lanches.join(", ")}</p>
      <div class="acoes">
        <button class="btn btn-delete" onclick="removerCliente(${cliente.id})">
          <i class="fas fa-trash"></i> Remover
        </button>
      </div>
    `;
    listaClientes.appendChild(li);
  });
}

async function removerCliente(id) {
  if (!confirm("Deseja remover este cliente?")) return;
  const res = await fetch(`${BASE_URL}/clientes/${id}`, { method: "DELETE" });
  if (res.ok) carregarClientes();
  else alert("Erro ao remover cliente.");
}

// Carregar Cardápio
async function carregarCardapio() {
  const res = await fetch(`${BASE_URL}/lanches`);
  const lanches = await res.json();
  listaCardapio.innerHTML = "";

  lanches.forEach((lanche) => {
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `
      <h3>${lanche.nome}</h3>
      <p><strong>ID:</strong> ${lanche.id}</p>
    `;
    listaCardapio.appendChild(li);
  });
}

// Carregar tudo ao iniciar
document.addEventListener("DOMContentLoaded", () => {
  carregarLanches();
  carregarClientes();
  carregarCardapio();
});

const fs = require("fs");
const path = require("path");

class ClienteObserver {
  atualizar(evento, entidade) {
    throw new Error("Método 'atualizar' deve ser implementado.");
  }
}

class LogClienteObserver extends ClienteObserver {
  atualizar(evento, entidade) {
    const nome = entidade.nome || "(sem nome)";
    const data = new Date().toISOString();
    const logLinha = `[${data}] Evento: ${evento} | Nome: ${nome}\n`;

    // Log no console com destaque
    console.log(`📢 [${evento.toUpperCase()}] → ${nome}`);

    // Log em arquivo
    const caminhoLog = path.join(__dirname, "../log_clientes.txt");
    try {
      fs.appendFileSync(caminhoLog, logLinha, "utf-8");
    } catch (err) {
      console.error("Erro ao gravar log:", err.message);
    }
  }
}

module.exports = { ClienteObserver, LogClienteObserver };

class ObserverManager {
    constructor() {
      this.observers = [];
    }
  
    adicionar(observer) {
      if (observer && typeof observer.atualizar === "function") {
        this.observers.push(observer);
      } else {
        console.warn("Observer inválido: precisa implementar método 'atualizar'");
      }
    }
  
    notificar(evento, entidade) {
      this.observers.forEach(observer => {
        try {
          observer.atualizar(evento, entidade);
        } catch (err) {
          console.error("Erro ao notificar observer:", err.message);
        }
      });
    }
  }
  
  module.exports = ObserverManager;
  
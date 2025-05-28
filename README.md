Projeto: Lancheria Come Mais

1 Padrão Criacional Utilizado para app.js:
Controll serve: Controlador trata requisições e chama funções de serviço

2 Padrão Criacional Utilizado para o clientes.js e lanches.js:
Modulo de serviço(Serve Layer):Camada de lógica de negócio separada das rotas ou controladores

1 Padrão Estrutural utilizado:

Facade – fornece uma interface simplificada para um conjunto de interfaces no subsistema, facilitando a integração entre os módulos de comidas e clientes.

2 Padrão Estrutural utilizado:

Module – encapsula funcionalidades (como clienteFactory e comidaFactory) em unidades independentes e reutilizáveis, com escopo controlado.

1 Padrão Comportamental utilizado:

Observer – notifica automaticamente componentes (por exemplo, um painel de pedidos ou sistema de notificações) quando há alterações nos dados de comidas ou clientes.

2 Padrão Comportamental utilizado:

Strategy – encapsula algoritmos de negócio como cálculo de descontos, formas de pagamento, ou regras de fidelidade, permitindo trocar a lógica sem alterar o sistema principal.

Ferramenta de teste utilizada no projeto (clientes.js e lanches.js):

Jest – framework de testes para JavaScript, fácil de configurar e ideal para validar funções dos módulos comidaFactory e clienteFactory.

Descrição Geral do Sistema:
O sistema da Lancheria Come Mais foi desenvolvido com foco na gestão de pedidos e clientes. Ele conta com dois módulos principais (CRUDs) integrados: um para gerenciar os dados das comidas e outro para gerenciar os dados dos clientes.
Requisitos Funcionais:

- Linguagens Utilizadas: JavaScript (servidor e lógica).

- CRUD de Comidas:
- Adicionar novas comidas ao cardápio.
- Excluir comidas existentes.
- Atualizar os ingredientes das comidas.
- Consultar os dados das comidas.

- CRUD de Clientes:
- Cadastrar novos clientes.
- Remover clientes antigos.
- Atualizar informações com base em compras realizadas.
- Consultar os dados dos clientes

.
Requisitos Não Funcionais:

- O sistema deve apresentar desempenho rápido e eficiente.
- Os dois módulos (comidas e clientes) devem funcionar de forma integrada e comunicar-se entre si sem falhas.

---

PLANEJAMENTO:

Entrega 1:

-> Planejamento, descrição geral do sistema, requisitos funcionais e não funcionais listados;
-> Criação do Repositório
-> CRUDs mencionados;
-> Padrão de Projeto implementado;
-> Organização e estruturação dos arquivos;
-> README.md feito.
-> Testes unitários para cobrir os objetos criados.

Entrega 2:

-> Os 2 Padrões Estruturados adicionados;
-> Atualização do código com mais funcionalidades;
-> Testes unitários para cobrir novos objetos criados.

Entrega 3:

-> Os 2 Padrões Comportamentais adicionados;
-> Implementação do Front-End.

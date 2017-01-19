# DB Server - Agenda de Compromissos
Esta ferramenta consiste na implementação de um sistema de CRUD para compromissos de usuários de uma determinada equipe de trabalho.

Um compromisso possui os seguintes atributos:
* título
* data/horário de início
* data/horário de término
* detalhes (opcional)

Os campos de formulário devem ser validados (obrigatório ou não), e em caso de falha uma mensagem de erro deve ser apresentada.


## Funcionalidades

### Criar
Cadastra um novo compromisso na agenda.


### Modificar
Modifica os dados obrigatórios de um compromisso (atributo 'detalhes' não está na descrição da história mas há permissão de modificá-lo).


### Visualizar
Mostra a minha agenda de compromissos contendo: título, data/horário de início e término.


### Visualizar Detalhes
Mostra todos os dados de um determinado compromisso (ou seja mais os detalhes).


### Deletar
Remove um compromisso selecionado, ele não deverá mais aparecer em telas de visualização.
Uma tela de confirmação é apresentada para garantir que não ocorram exclusões acidentais.


### Contagem
Apresenta o número total de compromissos de determinado usuário. Essa informação deve aparecer em todas as telas do sistema. Optei por apresentar apenas o número de compromissos ainda pendentes a partir da data corrente.


## Testes
Uma cobertura de testes automatizados é necessária, para tanto um valor de 90% ou maior será considerado aceitável, no entanto não foi alcançado tal valor. Utilizei a combinação Karma + Jasmine para a geração e execução dos testes. Acessando a pasta "/coverage" após a execução do karma é possível visualizar uma tabela que contém a cobertura de código.

Para rodar os testes automatizados, execute o seguinte comando:
$ karma start


## Executar a aplicação
Use o git para fazer download da aplicação no repositório abaixo:
https://github.com/advecchia/dbserver-angular.git

Na pasta raiz baixe as dependências executado o comando abaixo:
$ npm install

Para que houvesse um servidor provendo dados e serviços foi utilizado json-server. Execute o seguinte comando dentro da raiz da aplicação para levantar o sistema:
$ json-server --watch db.json

Acesse a agenda de compromissos em:
http://localhost:3000/


## Possíveis Melhorias
* Aumentar cobertura de testes automatizados;
* Tratamento de erros tanto para formulários quando para chamadas do serviço;
* Adicionar mudança de view para formato de calendário, ou outras formas como ver por semana;
* Adicionar spinners para o caso de requisições lentas que deixem o usuário em espera;
* Adicionar notificações para o usuário sobre a proximidade de um evento;
* Adicionar eventos recorrentes;


## Dificuldades, etc.
Melhor entendimento dos requisitos e manter o escopo. Iniciei tentando desenvolver algo mais complexo como um calendário mas depois notei que acaberia levando muito mais tempo para criar uma view desta forma e isso não era exatamente o objetivo. Praticamente joguei fora a implementação anterior que havia feito e recriei o formato em lista.


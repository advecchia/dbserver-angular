# DB Server - Agenda de Compromissos

Esta ferramenta consiste na implementação de um sistema de CRUD para compromissos de usuários de uma determinada equipe de trabalho.

Um compromisso possui os seguintes atributos:
- título
- data/horário de início
- data/horário de término
- detalhes (opcional)

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
Uma cobertura de testes automatizados é necessária, para tanto um valor de 90% ou maior será considerado aceitável.

## Possíveis Melhorias
* Tratamento de erros tanto para formulários quando para chamadas do serviço.
* Adicionar mudança de view para formato de calendário, ou outras formas como ver por semana.
* Adicionar spinners para o caso de requisições lentas que deixem o usuário em espera.
* Adicionar notificações para o usuário sobre a proximidade de um evento.
* Adicionar eventos recorrentes.

## Dificuldades, etc.
Melhor entendimento dos requisitos e manter o escopo. Iniciei tentando desenvolver algo mais complexo como um calendário mas depois notei que acaberia levando muito mais tempo para criar uma view desta forma e isso não era exatamente o objetivo. Praticamente joguei fora a implementação anterior que havia feito e recriei o formato em lista.

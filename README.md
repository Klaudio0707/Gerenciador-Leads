
 --Gerenciador de Leads --
                             ##
Sobre o Projeto
Esta aplicação consiste num sistema de captação e gestão de leads, com backend construído em Next.js e um banco de dados PostgreSQL.

<img width="1237" height="504" alt="Dashboard" src="https://github.com/user-attachments/assets/8b683554-ca62-4fd7-a97b-c9fa35f763ae" />


Funcionalidades Implementadas
A aplicação possui todas as funcionalidades requisitadas, incluindo os diferenciais:

Tela de Captação (/cadastro)
Formulário com campos para 

Nome, E-mail e Telefone.

Validação no frontend para uma melhor experiência do utilizador e validação robusta no backend para garantir a integridade dos dados.

Ao submeter, o lead é salvo no banco de dados e o utilizador é redirecionado para uma conversa no WhatsApp.


Regra de Negócio: Impede o cadastro de leads com o mesmo e-mail num intervalo de 1 hora.

Tela de Visualização (/leads)
Exibição de todos os leads cadastrados numa tabela clara e organizada.



Gestão de Status: Permite visualizar e alterar o status de cada lead (NOVO, EM CONTATO, CONVERTIDO).

Edição em Linha: Funcionalidade para editar nome, e-mail e telefone diretamente na tabela.


Campo de Busca: Filtra dinamicamente a lista de leads por nome, e-mail ou telefone.


Filtros Adicionais: Permite filtrar a lista por status e por data de cadastro.


Dashboard de Contagem: Exibe a quantidade total de leads para cada status.

Contato via WhatsApp: Link direto para iniciar uma conversa com o lead.

Stack de Tecnologias

Framework Full-Stack: Next.js (com App Router) 

Linguagem: TypeScript


Banco de Dados: PostgreSQL 


ORM: Prisma 

Estilização: CSS Modules

Como Executar o Projeto Localmente
Pré-requisitos:

Node.js (versão LTS v20.x recomendada)

NPM ou Yarn

Uma instância do PostgreSQL a correr

Passo a passo:

Clone o repositório:

Bash

git clone [URL_DO_SEU_REPOSITORIO]
cd [NOME_DA_PASTA_DO_PROJETO]
Instale as dependências:

Bash

npm install
Configure as Variáveis de Ambiente:

Renomeie o ficheiro .env.example (se existir) para .env.

Abra o ficheiro .env e configure a sua DATABASE_URL do PostgreSQL:

DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO"
Configure também a variável para o número do WhatsApp:

NEXT_PUBLIC_WHATSAPP_NUMBER="SEU_NUMERO_DE_WHATSAPP"
Execute as Migrations do Prisma:

Este comando irá criar as tabelas no seu banco de dados com base no schema.prisma.

Bash

npx prisma migrate dev
Rode o projeto:

Bash

npm run dev
A aplicação estará disponível em http://localhost:3000.

Endpoints da API
POST /api/leads: Cria um novo lead.

GET /api/leads: Busca a lista de leads (suporta filtros via query params: ?search=, ?status=, ?date=).

PUT /api/leads/[id]: Atualiza um lead específico.

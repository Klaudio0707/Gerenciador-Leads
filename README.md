


Gerenciador de Leads
Um sistema full-stack para captação e gestão de leads, desenvolvido com Next.js, Prisma e PostgreSQL, como parte de um teste técnico.

<img width="1237" height="504" alt="Dashboard" src="https://github.com/user-attachments/assets/8b683554-ca62-4fd7-a97b-c9fa35f763ae" />

📋 Índice
Sobre o Projeto

Funcionalidades

Stack de Tecnologias

Como Executar

Estrutura do Projeto

Endpoints da API

🎯 Sobre o Projeto
Este projeto foi desenvolvido para cumprir os requisitos de um teste técnico para a vaga de Desenvolvedor(a) Backend Júnior/Pleno. A aplicação permite a captação de leads através de um formulário e a sua posterior visualização e gestão num painel administrativo. O prazo de entrega do teste, 24/09/2025, foi cumprido.

✨ Funcionalidades
A aplicação implementa todas as funcionalidades requisitadas, incluindo os diferenciais propostos.

Backend
API RESTful construída com Next.js App Router.

Validações robustas no servidor para garantir a integridade dos dados.

Regra de negócio para duplicidade de e-mails, impedindo novos cadastros do mesmo e-mail num intervalo de 1 hora.

Filtragem e busca processadas diretamente no banco de dados para melhor performance.

Frontend
Página de Captação de Leads com formulário e redirecionamento automático para o WhatsApp após o cadastro.

Dashboard para Visualização de Leads com uma tabela clara e organizada para o cliente.

Gestão de Status (NOVO, EM CONTATO, CONVERTIDO) de forma interativa.

Edição em linha das informações do lead (nome, e-mail, telefone).

Busca e Filtros dinâmicos por status e data.

Exibição da contagem de leads por status.

🚀 Stack de Tecnologias
Framework Full-Stack: Next.js (App Router)

Linguagem: TypeScript

Banco de Dados: PostgreSQL

ORM: Prisma

Estilização: CSS Modules

🏁 Como Executar
Pré-requisitos:

Node.js (v20.x LTS)

NPM ou Yarn

Instância do PostgreSQL a correr

Passo a passo:

Clone o repositório:

Bash

git clone [URL_DO_SEU_REPOSITORIO]
cd [NOME_DA_PASTA_DO_PROJETO]
Instale as dependências:

Bash

npm install
Configure as Variáveis de Ambiente:

Crie um ficheiro .env na raiz do projeto.

Adicione e configure a sua DATABASE_URL do PostgreSQL:
DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO"

Adicione a variável para o número do WhatsApp (usada no formulário):
NEXT_PUBLIC_WHATSAPP_NUMBER="SEU_NUMERO_COM_CODIGO_DO_PAIS"

Execute as Migrations do Prisma:

Este comando irá criar as tabelas no seu banco de dados.

Bash

npx prisma migrate dev
Rode o projeto:

Bash

npm run dev
A aplicação estará disponível em http://localhost:3000.

📂 Estrutura do Projeto
A arquitetura do projeto segue as melhores práticas do Next.js, com uma clara separação de responsabilidades:

src/app/: Contém as rotas da aplicação (páginas e APIs), seguindo a convenção do App Router.

src/components/: Armazena todos os componentes React reutilizáveis.

src/lib/: Utilitários e configurações partilhadas, como a instância singleton do Prisma.

prisma/: Contém o schema do banco de dados e os ficheiros de migração.

📡 Endpoints da API
Método	Rota	Descrição
POST	/api/leads	Cria um novo lead. Aplica a validação de 1 hora para e-mails duplicados.
GET	/api/leads	Busca a lista de leads. Suporta query params para filtros (status, search, date).
PUT	/api/leads/[id]	Atualiza as informações (nome, e-mail, telefone, status) de um lead específico.
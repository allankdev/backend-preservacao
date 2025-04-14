# 🗂️ Sistema de Preservação Digital – Backend

Este repositório contém o **backend** do sistema fullstack para gestão e preservação de documentos PDF, **simulando o fluxo de preservação** baseado no padrão SIP/AIP/DIP da ferramenta **Archivematica**.

---

## 🚀 Tecnologias Utilizadas

| Camada       | Tecnologias                                               |
|--------------|------------------------------------------------------------|
| Backend      | [NestJS](https://nestjs.com/), Prisma ORM, PostgreSQL     |
| Documentação | Swagger (OpenAPI 3)                                       |
| Extras       | JWT Auth, Class-validator, class-transformer              |

---

## ⚙️ Funcionalidades Implementadas

### 🔐 Autenticação
- Cadastro de usuário (`POST /auth/register`)
- Login de usuário (`POST /auth/login`)
- Autenticação via token JWT com `Bearer <token>`

### 📄 Documentos
- Criar novo documento com metadados personalizados (`POST /documents`)
- Upload de arquivo PDF com metadata via `multipart/form-data`
- Listar documentos do usuário autenticado (`GET /documents`)
- Ver detalhes de um documento (`GET /documents/:id`)
- Atualizar status de preservação (`PATCH /documents/:id/status`)
- Deletar documento (`DELETE /documents/:id`)
- Visualizar PDF via iframe seguro (`GET /documents/:id/view`)
- Gerar token temporário para acesso ao PDF (`GET /documents/:id/token`)
- 🔁 **Simulação do processo de preservação via Archivematica Mock** (`GET /documents/:id/processar`)

---

## 📦 Estrutura SIP/AIP/DIP (Simulada)

Este projeto **simula** o fluxo de preservação digital com base nos padrões da **Archivematica**:

- **SIP** (Submission Information Package) → pacote enviado
- **AIP** (Archival Information Package) → pacote preservado
- **DIP** (Dissemination Information Package) → pacote acessível para visualização/download

> A integração real com a Archivematica será implementada futuramente. Atualmente, o backend simula esse processo com status automáticos ou rota de simulação.

---

## 🧪 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/allankdev/backend-preservacao.git
cd backend-preservacao
2. Instale as dependências
bash
Copiar
Editar
npm install
3. Configure o banco de dados
Crie um banco PostgreSQL local (ex: preservacao)

Copie o .env.example para .env e configure os dados:

ini
Copiar
Editar
DATABASE_URL="postgresql://postgres:senha@localhost:5432/preservacao"
JWT_SECRET="segredo123"
4. Rode as migrations
bash
Copiar
Editar
npx prisma migrate dev --name init
5. Inicie o servidor
bash
Copiar
Editar
npm run start:dev
📄 Swagger (Documentação da API)
📍 Acesse: http://localhost:3000/api

Use o botão "Authorize" no Swagger para autenticar com seu token JWT.

🔐 Teste Rápido via Swagger
POST /auth/register → Crie um novo usuário

POST /auth/login → Copie o token JWT

Clique em Authorize → Cole Bearer <seu_token>

Teste os endpoints protegidos em /documents

🧱 Observações sobre o ambiente
❌ Docker:

Este projeto não utiliza Docker por limitações de compatibilidade do sistema operacional (macOS 11.7). Todos os serviços devem ser executados localmente de forma tradicional.

🌟 Funcionalidades Futuras (não implementadas)
Integração real com a API do Archivematica

Exportação de metadados em XML

Exportação de AIP/DIP via HTTP

Envio assíncrono com filas de processamento

Painel administrativo com controle de status

🧑‍💻 Autor
Desenvolvido por Allan Kelven

Email: allankelven.ak@gmail.com

📅 Entrega
Desafio técnico para a vaga de Estagiário Fullstack – LedgerTec

Prazo final: 22 de abril de 2025

🔗 Repositório GitHub:
https://github.com/allankdev/backend-preservacao
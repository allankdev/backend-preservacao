# 🗂️ Sistema de Preservação Digital – Backend

Este repositório contém o **backend** do sistema fullstack para gestão e preservação de documentos PDF, simulando o fluxo de preservação baseado no padrão SIP/AIP/DIP da ferramenta **Archivematica**.

---

## 🚀 Tecnologias Utilizadas

| Camada     | Tecnologias                              |
|------------|-------------------------------------------|
| Backend    | [NestJS](https://nestjs.com/), Prisma ORM, PostgreSQL |
| Documentação | Swagger (OpenAPI 3)                     |
| Extras     | JWT Auth, Class-validator, class-transformer |

---

## ⚙️ Funcionalidades Implementadas

### 🔐 Autenticação
- Cadastro de usuário (`POST /auth/register`)
- Login de usuário (`POST /auth/login`)
- Autenticação via token JWT com `Bearer <token>`

### 📄 Documentos
- Criar novo documento com metadados personalizados (`POST /documents`)
- Listar documentos do usuário autenticado (`GET /documents`)
- Ver detalhes de um documento (`GET /documents/:id`)
- Atualizar status de preservação (`PATCH /documents/:id/status`)
- Deletar documento (`DELETE /documents/:id`)

---

## 📦 Estrutura SIP/AIP/DIP

Este projeto simula o fluxo de preservação digital com base nos padrões da **Archivematica**:

- SIP (Submission Information Package) → pacote enviado
- AIP (Archival Information Package) → pacote preservado
- DIP (Dissemination Information Package) → pacote acessível para download

> A integração real com a Archivematica será implementada futuramente ou simulada via polling/mock.

---

## 🧪 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/backend-preservacao.git
cd backend-preservacao
2. Instale as dependências
bash
Copiar
Editar
npm install
3. Configure o banco de dados
Crie um banco PostgreSQL local (ex: preservacao)

Configure o .env:

env
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
🧬 Swagger (Documentação da API)
Disponível em:

👉 http://localhost:3000/api

Use o botão Authorize para testar endpoints protegidos com JWT.

🔐 Teste Rápido via Swagger
POST /auth/register → Crie um usuário

POST /auth/login → Copie o token

Clique em Authorize e cole Bearer <seu_token>

Teste os endpoints protegidos de /documents

✨ Funcionalidades futuras / extras
Upload real com integração à Archivematica

Frontend com Next.js

Visualização dos PDFs inline

Notificações de atualização de status via polling

Exportação dos metadados como JSON/XML

🧑‍💻 Autor
Desenvolvido por <ALLAN KELVEN>
Email: allankelven.ak@gmail.com

📅 Entrega
Desafio técnico para a vaga de Estagiário Fullstack – LedgerTec

Prazo final: 22 de abril de 2025

Repositório GitHub:
https://github.com/allankdev/backend-preservacao



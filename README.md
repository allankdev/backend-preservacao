# 🗂️ Sistema de Preservação Digital – Backend

Este repositório contém o **backend** do sistema fullstack para gestão e preservação de documentos PDF, **simulando o fluxo de preservação** baseado no padrão SIP/AIP/DIP da ferramenta **Archivematica**.

---

## 🚀 Tecnologias Utilizadas

| Camada       | Tecnologias                                                |
|--------------|------------------------------------------------------------|
| Backend      | [NestJS](https://nestjs.com/), Prisma ORM, PostgreSQL      |
| Documentação | Swagger (OpenAPI 3)                                        |
| Extras       | JWT Auth, Class-validator, class-transformer               |

---

## ⚙️ Funcionalidades Implementadas

### 🔐 Autenticação
- `POST /auth/register` – Cadastro de usuário  
- `POST /auth/login` – Login de usuário  
- Autenticação via token JWT com `Bearer <token>`

### 📄 Documentos
- `POST /documents` – Criar novo documento com metadados personalizados  
- Upload de arquivo PDF via `multipart/form-data`  
- `GET /documents` – Listar documentos do usuário autenticado  
- `GET /documents/:id` – Ver detalhes de um documento  
- `PATCH /documents/:id/status` – Atualizar status de preservação  
- `DELETE /documents/:id` – Deletar documento  
- `GET /documents/:id/view` – Visualizar PDF via iframe seguro  
- `GET /documents/:id/token` – Gerar token temporário para acesso ao PDF  
- `GET /documents/:id/processar` – 🔁 Simulação do processo de preservação via Archivematica

---

## 📁 Estrutura do Projeto

```
/src
├── auth/                  # Módulo de autenticação (JWT, login, registro)
│   ├── dto/               # DTOs para login e registro
│   ├── jwt-auth.guard.ts  # Guard para rotas protegidas
│   ├── jwt-strategy.ts    # Estratégia JWT para validação
│   └── auth.module.ts     # Módulo Auth
│
├── documents/             # Módulo principal de documentos
│   ├── dto/               # DTOs para criação e atualização de status
│   ├── documents.controller.ts
│   ├── documents.service.ts
│   └── documents.module.ts
│
├── arquivematica/         # Simulação do processamento SIP/AIP/DIP
│   ├── archivematica.service.ts
│   └── archivematica.module.ts
│
├── prisma/                # Conexão e schema do banco via Prisma
└── app.module.ts          # Módulo raiz

/uploads                   # Pasta de uploads locais de PDFs  
/test                      # Testes e2e (NestJS + Jest)  
.env                       # Variáveis de ambiente  
```

---

## 📦 Estrutura SIP/AIP/DIP (Simulada)

Este projeto **simula** o fluxo de preservação digital com base nos padrões da **Archivematica**:

- **SIP** – *Submission Information Package* (pacote enviado)  
- **AIP** – *Archival Information Package* (pacote preservado)  
- **DIP** – *Dissemination Information Package* (pacote acessível para visualização/download)  

> A integração real com a Archivematica será implementada futuramente. Atualmente, o backend simula esse processo com status automáticos ou rota de simulação.

---

## 🧪 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/allankdev/backend-preservacao.git
cd backend-preservacao
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

- Crie um banco PostgreSQL local (ex: `preservacao`)
- Copie `.env.example` para `.env` e configure os dados:

```ini
DATABASE_URL="postgresql://postgres:senha@localhost:5432/preservacao"
JWT_SECRET="segredo123"
```

### 4. Rode as migrations

```bash
npx prisma migrate dev --name init
```

### 5. Inicie o servidor

```bash
npm run start:dev
```

---

## 📄 Swagger (Documentação da API)

- Acesse: [http://localhost:3000/api](http://localhost:3000/api)
- Clique em **"Authorize"** e cole seu token JWT para testar os endpoints protegidos

### 🔐 Teste Rápido via Swagger

1. `POST /auth/register` – Crie um novo usuário  
2. `POST /auth/login` – Copie o token JWT  
3. Clique em "Authorize" e cole: `Bearer <seu_token>`  
4. Teste os endpoints protegidos da rota `/documents`

---

## ⚙️ Observações sobre o ambiente

### ❌ Docker
Este projeto **não utiliza Docker** por limitações de compatibilidade com o sistema operacional (macOS 11.7). Todos os serviços devem ser executados localmente de forma tradicional.

---

## 🌟 Funcionalidades Futuras (não implementadas)

- Integração real com a API do Archivematica  
- Exportação de metadados em XML  
- Exportação de pacotes AIP/DIP via HTTP  
- Envio assíncrono com filas de processamento  
- Painel administrativo com controle de status

---

## 👤 Autor

**Desenvolvido por:** Allan Kelven  
**Email:** [allankelven.ak@gmail.com](mailto:allankelven.ak@gmail.com)

---

## 📅 Entrega

Desafio técnico para a vaga de **Estagiário Fullstack – LedgerTec**  
**Prazo final:** 22 de abril de 2025

---

## 🔗 Repositório

[github.com/allankdev/backend-preservacao](https://github.com/allankdev/backend-preservacao)

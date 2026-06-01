# PsiApp

Plataforma web para conectar **pacientes** e **psicólogos**: busca de profissionais, solicitação de consultas, gestão de disponibilidade e acompanhamento de status — projeto de Engenharia de Software (7º período).

## Proposta do aplicativo

| Persona | O que faz no MVP |
|---------|------------------|
| **Paciente** | Busca psicólogos com filtros permitidos, vê perfil, solicita horário (PENDENTE), acompanha e cancela consultas |
| **Psicólogo** | Cadastra disponibilidade, aceita ou recusa solicitações, vê agenda, mensagens e notificações |

Regra central: toda consulta nasce **PENDENTE** até o psicólogo aceitar (**CONFIRMADA**) ou recusar (**RECUSADA**).

## Stack

| Camada | Tecnologias |
|--------|-------------|
| **Frontend** | React, TypeScript, Vite, Mantine UI, React Router, Zustand, TanStack Query |
| **Backend** | Node.js, NestJS, TypeScript, Prisma ORM, JWT, RBAC, Zod |
| **Banco** | PostgreSQL ([Neon](https://neon.tech)) |

**Arquitetura:** monólito modular stateless, multi-tenant (`tenantId`), API REST em `/api`.

Diagrama: [`docs/arquitetura.md`](docs/arquitetura.md) · decisões: [`docs/decisões.md`](docs/decisões.md).

## Status do projeto (fase atual)

| Área | Situação |
|------|----------|
| UI paciente + psicólogo | Completa (demo acadêmica) |
| Modo **mock** (`VITE_USE_MOCKS=true`) | Recomendado para apresentação sem rede |
| Modo **API real** | Login, busca de psicólogos e perfil integrados ao Neon |
| Backend NestJS + Prisma | Rotas, JWT, RBAC, migrations versionadas |
| Neon | Configurado — `prisma migrate` + seed demo |
| Outros módulos no front | Parcial (consultas, mensagens — mappers pendentes) |
| Prontuário | Bloqueado na API (501) |

## Como rodar (apresentação)

### 1. Demo rápida (mocks — sem banco)

```bash
cd frontend
npm install
npm run dev
```

Abra http://localhost:5173 — login com qualquer e-mail; o seletor define paciente ou psicólogo.

### 2. Com API + Neon (integração real)

**Backend:**

```bash
cd backend
npm install
copy .env.example .env
# Preencha DATABASE_URL (pooler) e DIRECT_URL (host direto) — Neon Console
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

**Frontend** — crie `frontend/.env.local`:

```env
VITE_USE_MOCKS=false
VITE_API_URL=http://localhost:3333/api
```

```bash
cd frontend
npm run dev
```

**Logins demo** (após seed, senha `123456`):

| Perfil | E-mail |
|--------|--------|
| Paciente | `camila.souza@email.com` |
| Psicólogo | `ana.costa@email.com` |

Rotas-chave para a banca: `/patient/search` · `/patient/psychologist/:id` · `/psychologist/requests`.

### Testes automatizados

```bash
npm install          # raiz — dependências dos scripts de teste
npm run test:all     # 51 testes (23 front + 28 back)

cd backend && npm run test:neon   # integração HTTP + Neon (backend rodando)
```

## Variáveis de ambiente

Ver `frontend/.env.example` e `backend/.env.example`. **Nunca** commite `.env` com senhas.

## Documentação

| Documento | Conteúdo |
|-----------|----------|
| [`docs/apresentacao.md`](docs/apresentacao.md) | Roteiro da banca (10–15 min) |
| [`docs/guia.md`](docs/guia.md) | Prints em `docs/prints/` |
| [`docs/escopo-do-projeto.md`](docs/escopo-do-projeto.md) | Escopo e regras |
| [`docs/api_contratos.md`](docs/api_contratos.md) | Contratos REST |
| [`docs/entrega-sumário.md`](docs/entrega-sumário.md) | Resumo da entrega |
| [`docs/proximos-passos.md`](docs/proximos-passos.md) | Evolução (8º período) |

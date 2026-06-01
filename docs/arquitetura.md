# PsiApp — Arquitetura

Visão do sistema na fase atual do projeto (acadêmica + Neon configurado).

## Fluxo geral

```
Paciente / Psicólogo
        │ usa (HTTPS)
        ▼
┌───────────────────────────────────────┐
│  Frontend Web (SPA)                    │
│  React · TypeScript · Vite             │
│  Mantine · TanStack Query · Zustand    │
│  execução: localhost / build estático  │
└─────────────────┬─────────────────────┘
                  │ HTTPS / JSON
                  ▼
┌───────────────────────────────────────┐
│  Backend API                           │
│  NestJS · TypeScript                   │
│  Monólito modular · stateless          │
│  JWT + RBAC · tenant_id                │
│  execução: localhost:3333              │
└─────────────────┬─────────────────────┘
                  │ Prisma
                  ▼
┌───────────────────────────────────────┐
│  PostgreSQL (Neon — sa-east-1)         │
└───────────────────────────────────────┘
```

## Camadas

| Camada | Tecnologia | Responsabilidade |
|--------|------------|------------------|
| Cliente | React SPA | UI paciente/psicólogo, estado (Zustand), cache (TanStack Query) |
| API | NestJS | REST `/api`, Zod, guards JWT e `@Roles` |
| Dados | Prisma + PostgreSQL | Persistência multi-tenant |

## Backend (NestJS)

- Módulos: `auth`, `users`, `psychologists`, `scheduling`, `appointments`, `messages`, `notifications`, `therapeutic-bonds`, `audit`, `tenants`, …
- `GET /health` fora do prefixo `/api`
- Neon: `DATABASE_URL` (pooler) + `DIRECT_URL` (migrations)

## Frontend

| Modo | Variável | Uso |
|------|----------|-----|
| Mock | `VITE_USE_MOCKS=true` | Apresentação offline, dados em memória |
| API | `VITE_USE_MOCKS=false` | Login real, busca de psicólogos (mapper Prisma → UI) |

## Segurança

- Senhas: bcrypt
- Sessão: JWT access + refresh (stateless)
- RBAC: `PATIENT`, `PSYCHOLOGIST`, `ADMIN`
- Prontuário: API retorna **501** até requisitos clínicos/auditoria

## Integração (ponto de parada documentado)

| Fluxo | Estado |
|-------|--------|
| Login + JWT | OK |
| Busca `/patient/search` | OK (mapper) |
| Perfil psicólogo | OK |
| Consultas, mensagens (front) | Parcial — mappers pendentes |
| Prontuário | Bloqueado |

Evolução: [`proximos-passos.md`](proximos-passos.md).

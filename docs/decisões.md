# Decisões do projeto PsiApp

## Arquitetura

- Front (React) e back (NestJS) separados.
- PostgreSQL no **Neon** com `tenantId` por clínica.
- JWT + RBAC; API stateless.
- Monólito modular (sem microsserviços no MVP).

## Frontend

- **Mantine UI** — componentes e tema customizado.
- **Zustand** — sessão; **TanStack Query** — dados remotos.
- Toggle `VITE_USE_MOCKS` para demo acadêmica vs API real.

## Backend

- **NestJS** com guards JWT/RBAC e services por domínio.
- **Prisma** como ORM; migrations em `backend/prisma/migrations/`.

## Hospedagem

- Desenvolvimento e apresentação em **localhost** (Vite + Nest).
- Banco em **Neon** (nuvem).
- Não utilizamos Vercel neste repositório (foi apenas teste descartado).

## Segurança

- bcrypt, prontuário 501, filtros de busca sem critérios sensíveis.

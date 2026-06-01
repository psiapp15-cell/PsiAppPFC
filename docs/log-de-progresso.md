# PsiApp — Log de Progresso

Registro das principais entregas do projeto.

## Maio/2026 — Semana 1

- Definição do escopo e decisões de arquitetura
- Setup React + Vite + Mantine
- Landing, login fake, rotas protegidas
- Layout base (sidebar, topbar)

## Maio/2026 — Semana 2

- Fluxo paciente: busca, detalhe, agendamento, minhas consultas
- Fluxo psicólogo: disponibilidade, solicitações, agenda
- Mocks centralizados em `frontend/src/mocks/data.ts`
- Services preparados para trocar mock por API

## Maio/2026 — Semana 3

- Backend inicial + schema Prisma
- Módulos: auth, users, psychologists, scheduling, appointments, etc.
- Contratos documentados em [`api_contratos.md`](api_contratos.md)

## Maio/2026 — Semana 4

- **Migração do backend para NestJS** (guards JWT/RBAC, módulos Nest)
- Testes Vitest: 28 no backend, 23 no frontend (**51 total**)
- Login real no front quando `VITE_USE_MOCKS=false`
- Seed demo no Prisma · rota `POST /auth/refresh`
- Documentação revisada ([`arquitetura.md`](arquitetura.md), decisões, entrega)
- Prints e plano Figma ([`guia.md`](guia.md))

## Pendências (8º período)

- Criar banco no Neon e rodar `prisma migrate` + `seed`
- Integração completa front ↔ back (mappers pendentes)
- Edição de perfil
- Integração busca de psicólogos (mapper API)
- Prontuário com vínculo terapêutico e auditoria

Detalhes técnicos do frontend: [`frontend/docs/PROGRESS_LOG.md`](../frontend/docs/PROGRESS_LOG.md).

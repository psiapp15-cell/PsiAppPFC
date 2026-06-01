# PsiApp — Log do Frontend

Stack: React, TypeScript, Vite, Mantine UI, Zustand, TanStack Query.

## Semana 1 — Base

- Setup Vite + React + TS + Mantine
- Tema verde/bege, layout com sidebar e topbar
- Login fake com Zustand (patient / psychologist)
- Rotas protegidas
- Dashboard paciente com gráfico em SVG

## Semana 2 — Fluxos

- Busca e filtros de psicólogos
- Detalhe + agendamento (PENDENTE)
- Minhas consultas
- Painel psicólogo: disponibilidade, solicitações, agenda
- Mocks em `src/mocks/data.ts`

## Semana 3 — Integração preparada

- Services com toggle mock/real (`VITE_USE_MOCKS`)
- `apiClient` com token no header `Authorization`
- Login real quando `VITE_USE_MOCKS=false` + backend Nest em `VITE_API_URL`

## Semana 4 — Alinhamento com backend NestJS

- Documentação e contratos atualizados (`docs/api_contratos.md`)
- Testes Vitest: 23 no frontend (parte dos 51 do monorepo)
- Build de produção: `npm run build` em `frontend/`

## Pendências (8º período)

- Mapper do shape da API para o tipo `Psychologist`
- Mapper de mensagens administrativas
- Edição de perfil
- Fluxo E2E com API + Neon sem mocks

Arquitetura geral: [`../../docs/arquitetura.md`](../../docs/arquitetura.md).

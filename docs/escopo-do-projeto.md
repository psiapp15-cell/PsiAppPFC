# PsiApp — Escopo do Projeto

Documento de referência do trabalho de Engenharia de Software (7º período).

## Produto

Plataforma para conectar pacientes e psicólogos. No MVP o paciente busca profissionais, vê perfil, solicita horário e acompanha consultas. O psicólogo gerencia disponibilidade, aceita ou recusa pedidos e vê a agenda.

## Stack

| Área | Tecnologias |
|------|-------------|
| Frontend | React, TypeScript, Vite, Mantine UI, React Router, Zustand, TanStack Query |
| Backend | Node.js, NestJS, TypeScript, Prisma ORM, JWT, RBAC, Zod |
| Banco | PostgreSQL |
| Execução | Localhost (Vite + Nest); banco Neon (nuvem) |

Arquitetura detalhada: [`arquitetura.md`](arquitetura.md).

## Arquitetura

- Monólito modular **stateless** (NestJS).
- Várias clínicas no mesmo banco: coluna `tenantId` nas tabelas.
- API REST sob `/api`; health em `/health`.
- Autenticação JWT (access + refresh); autorização por papéis (`PATIENT`, `PSYCHOLOGIST`, `ADMIN`).
- Sem sessão no servidor — o token carrega usuário, papel e tenant.

## O que está pronto (maio/2026)

- Frontend completo com mocks e toggle para API real.
- Backend NestJS com módulos por domínio, guards JWT/RBAC, schema Prisma e seed demo.
- Contratos REST documentados em [`api_contratos.md`](api_contratos.md).
- 51 testes automatizados (Vitest) — ver [`testes-de-automacao.md`](testes-de-automacao.md).

## O que fica pro 8º período

- Banco Neon em produção (`migrate` + `seed`).
- Integração estável front ↔ back (todos os services sem mapper pendente).
- Prontuário com vínculo terapêutico, auditoria e criptografia.
- Testes E2E e deploy em produção (a definir).

Ver [`proximos-passos.md`](proximos-passos.md).

## Regras de negócio importantes

- Consulta nasce **PENDENTE**; psicólogo aceita ou recusa.
- Um horário não pode ir para dois pacientes.
- Filtros de busca só por critérios profissionais (sem dados sensíveis).
- Prontuário bloqueado até controle de acesso por perfil, vínculo terapêutico e auditoria (API retorna 501).

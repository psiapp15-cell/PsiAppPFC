# PsiApp — Testes Automatizados

| Camada | Ferramentas |
|--------|-------------|
| Frontend | Vitest + Testing Library |
| Backend | Vitest + Supertest + app Nest (`createApp` em `bootstrap.ts`) |

## Como rodar

```bash
# Frontend
cd frontend && npm run test:run

# Backend
cd backend && npm run test:run

# Tudo (raiz)
npm run test:all
```

## Resultado (31/05/2026)

| Camada | Testes | Arquivos |
|--------|--------|----------|
| Frontend | 23 | 7 |
| Backend | 28 | 6 |
| **Total** | **51** | 13 |

Todos passando sem banco real (Prisma mockado nos testes de service).

## Cobertura

**Frontend:** authStore, psychologistService, appointmentService, páginas Login/Register/Busca/Prontuário.

**Backend (NestJS):**

- `health.test.ts` — `GET /health`
- `auth.test.ts` — validação Zod, `/auth/me` sem token
- `refresh.test.ts` — refresh inválido/válido
- `auth-service.test.ts` — register/login/refresh (Prisma mock)
- `appointments-service.test.ts` — cancelar consulta
- `security.test.ts` — rotas protegidas retornam 401

Setup HTTP: `backend/tests/nest-app.ts` (inicializa `INestApplication` uma vez por arquivo).

## O que falta (8º período)

- Testes de integração com PostgreSQL (Neon)
- E2E Playwright (fluxo login → agendar → aceitar)
- CI no GitHub Actions

Relatório em texto: [`RELATORIO_TESTES.txt`](RELATORIO_TESTES.txt).

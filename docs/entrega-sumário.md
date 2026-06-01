# PsiApp — Resumo da Entrega (7º período)

Data: maio/2026

## Entregue

- Frontend React completo (paciente + psicólogo) com mocks e toggle `VITE_USE_MOCKS`
- Backend **NestJS** + Prisma: monólito modular, JWT, RBAC, validação Zod
- Auth: register, login, refresh, me
- Módulos: agendamentos, disponibilidade, psicólogos, mensagens, notificações, auditoria, vínculo terapêutico
- Documentação alinhada à stack (arquitetura, contratos, testes, decisões)
- Suite automatizada: **51 testes** passando (23 front + 28 back)

## Funcional no frontend

Landing, login, dashboards, busca, agendamento, disponibilidade, solicitações aceitar/recusar, mensagens e notificações (simuladas com mocks).

## Funcional no backend

Rotas REST implementadas, compilação Nest (`npm run build`), guards de autenticação e papel, schema Prisma com multi-tenant. Prontuário retorna **501** de propósito.

## Ainda simulado ou parcial

- Dados em memória no front quando `VITE_USE_MOCKS=true`
- Integração real: login + busca de psicólogos OK; consultas/mensagens com mapper pendente

## Não apresentar como pronto

- Prontuário clínico (bloqueado na API)
- Login/persistência real sem banco configurado
- Deploy em produção (fora do escopo desta entrega; execução local + Neon)

## Decisões

Ver [`decisões.md`](decisões.md) e [`arquitetura.md`](arquitetura.md).

## Próximo período

Completar integração, testes E2E, prontuário. Ver [`proximos-passos.md`](proximos-passos.md).

## Build e testes

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm run build

# Tudo
npm run test:all
```

Detalhes: [`testes-de-automacao.md`](testes-de-automacao.md) · [`RELATORIO_TESTES.txt`](RELATORIO_TESTES.txt).

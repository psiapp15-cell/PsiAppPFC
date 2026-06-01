# PsiApp — Próximos Passos (8º período)

## Já entregue nesta fase

- UI completa (paciente + psicólogo)
- Backend NestJS + Prisma + Neon
- Login real, busca de psicólogos com mapper API → front
- 51 testes Vitest + script `npm run test:neon`

## Prioridades

### A — Integração restante

- Mappers: appointments, notifications, messages
- Fluxo ponta a ponta: solicitar → aceitar → listar consultas

### B — Regras e segurança

- Transações no aceite/recusa
- Lock de horário
- Testes de isolamento por `tenantId`

### C — Prontuário

- Liberar com vínculo terapêutico + auditoria

### D — Qualidade

- E2E (Playwright) dos fluxos da banca
- CI (lint + testes)

### E — Produção (opcional)

- Deploy do backend (ex.: Render) com variáveis Neon
- Front como build estático ou mesmo host

Ordem sugerida: **A → B → D → C/E**.

# PsiApp — Roteiro de Apresentação

Duração: 10–15 min.

**Demo recomendada:** `cd frontend && npm run dev` com `VITE_USE_MOCKS=true` (fluxo completo sem banco).

## 1. Abertura (30s)

PsiApp — plataforma que conecta pacientes e psicólogos. MVP do 7º período: frontend funcional e backend NestJS implementado.

## 2. Problema (1 min)

Marcar consulta psicológica é burocrático. Falta um lugar para buscar por critério profissional e acompanhar o status.

## 3. Solução (1 min)

Busca com filtros permitidos, fluxo solicitação → aceite/recusa, painel para o psicólogo.

## 4. Público-alvo (30s)

Pacientes e psicólogos que querem agendar/gerir consultas online ou presencial.

## 5. Arquitetura (1–2 min)

Monólito modular stateless, multi-tenant (`tenantId`), JWT + RBAC.

Mostrar diagrama em [`arquitetura.md`](arquitetura.md): React → NestJS → Neon.

Decisões: [`decisões.md`](decisões.md).

## 6. Stack (1 min)

| Camada | Stack |
|--------|--------|
| Front | React, TypeScript, Vite, Mantine, Zustand, TanStack Query |
| Back | NestJS, TypeScript, Prisma, PostgreSQL, JWT, RBAC |

## 7. Demo (3–4 min)

1. Login como paciente
2. Buscar psicólogo → detalhe → solicitar horário (**PENDENTE**)
3. Minhas consultas
4. Login como psicólogo → aceitar solicitação
5. Voltar paciente → **CONFIRMADA**
6. Mostrar mobile

**Material visual:** prints em `docs/prints/` e Figma [PsiApp — Frames](https://www.figma.com/design/jnhOmxhkg5Vup3z0iOsqQs/PsiApp---Frames).

## 8. Mocks vs API real (1 min)

- **Mocks:** dados em memória — ideal para a banca nesta entrega.
- **API:** backend Nest pronto; falta Neon + `VITE_USE_MOCKS=false` para ponta a ponta.

## 9. Backend (1 min)

- NestJS com módulos (`auth`, `appointments`, …)
- Prisma schema multi-tenant
- Guards JWT e RBAC
- `GET /health` + `/api/*`
- 28 testes automatizados no backend

## 10. Segurança (1 min)

Hash de senha, prontuário bloqueado (501), RBAC nas rotas sensíveis, sem filtros discriminatórios na busca.

## 11. Encerramento (30s)

Próximo passo (8º período): completar integração (consultas, mensagens), E2E, prontuário. Ver [`proximos-passos.md`](proximos-passos.md).

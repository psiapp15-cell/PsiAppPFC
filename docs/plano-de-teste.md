# PsiApp — Plano de Testes Manuais

Ambiente típico: frontend `http://localhost:5173`, backend Nest `http://localhost:3333`.

Build verificado em **31/05/2026** (`vite` + `tsc` no front, `nest build` no back).

## Pré-requisitos

- `npm install` em `frontend/` e `backend/`
- Mocks ligados por padrão (`VITE_USE_MOCKS=true`)
- Para testes com API: `VITE_USE_MOCKS=false`, backend com `.env` e `npm run dev`

---

## TC-01 — Landing

Acessar `/`. Deve mostrar página inicial do PsiApp.

## TC-02 — Login paciente

Login com qualquer e-mail, selecionar "Sou Paciente". Redireciona para o dashboard paciente.

## TC-03 — Login psicólogo

Mesmo fluxo, selecionar "Sou Psicólogo". Redireciona para o dashboard psicólogo.

## TC-04 — Rotas protegidas

Sem login, acessar `/patient/dashboard` → redireciona para o login.

## TC-05 — Busca psicólogos

Filtrar por especialidade e modalidade. Lista atualiza.

## TC-06 — Detalhe psicólogo

Clicar em um card. Ver perfil e horários.

## TC-07 — Solicitar consulta

Escolher horário → status **PENDENTE** em Minhas Consultas.

## TC-08 — Cancelar consulta

Cancelar uma PENDENTE ou CONFIRMADA. Status **CANCELADA**.

## TC-09 — Disponibilidade (psicólogo)

Cadastrar e remover horário (mock ou API com token de psicólogo).

## TC-10 — Aceitar solicitação

Psicólogo aceita pedido → **CONFIRMADA**.

## TC-11 — Recusar solicitação

Psicólogo recusa → **RECUSADA**.

## TC-12 — Notificações

Ver lista no painel (mock ou `GET /api/notifications/me`).

## TC-13 — Mensagens

Ver mensagens (mock ou `GET /api/messages`).

## TC-14 — Prontuário

Tela mostra aviso de recurso não implementado. API: `GET /api/medical-records` → **501**.

## TC-15 — Responsivo

Testar navegação mobile (barra inferior).

---

## Backend (com Neon ou banco local)

## TC-20 — Saúde do servidor

`GET /health` retorna `{ "status": "ativo", "servico": "psiapp-backend" }`.

## TC-21 — Login real

`POST /api/auth/login` com usuário do seed (senha `123456`).

## TC-22 — Agendamento ponta a ponta

Com `VITE_USE_MOCKS=false` e banco migrado, fluxo paciente → PENDENTE → psicólogo aceita → CONFIRMADA.

## TC-23 — RBAC

`GET /api/audit` sem token → **401**; com token de paciente → **403**; com admin → **200**.

## TC-24 — Refresh token

`POST /api/auth/refresh` com `refreshToken` válido → novos `accessToken` e `refreshToken`.

---

Automatizados: ver [`testes-de-automacao.md`](testes-de-automacao.md).

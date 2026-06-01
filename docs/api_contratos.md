# PsiApp — Contratos de API

Base URL: `/api` (ex.: `http://localhost:3333/api`)  
Implementação: **NestJS** · validação **Zod** · auth **JWT** · papéis **RBAC** (`JwtAuthGuard` + `@Roles`).

Health check (fora do prefixo): `GET http://localhost:3333/health`

## Convenções

- Auth: header `Authorization: Bearer <accessToken>`
- Multi-tenant: `tenantId` no JWT ou header `x-tenant-id` em rotas públicas
- Papéis: `PATIENT`, `PSYCHOLOGIST`, `ADMIN`
- Erros: `{ "error": string, "details"?: unknown }`
- Status: 400 validação · 401 auth · 403 permissão · 404 não encontrado · 409 conflito · 501 não implementado

Legenda de status no projeto: **ok** = backend pronto · **mock** = só frontend simulado · **pendente** = falta integrar

---

## Autenticação

### POST /auth/register — ok
Body: `{ tenantId, name, email, password, role }`  
Resposta 201: `{ id, name, email, role, tenantId }`

### POST /auth/login — ok
Body: `{ email, password }`  
Resposta 200: `{ user, accessToken, refreshToken }`

### GET /auth/me — ok
Requer token. Resposta: dados do usuário logado.

### POST /auth/refresh — ok
Body: `{ refreshToken }`  
Resposta 200: `{ accessToken, refreshToken }`

---

## Psicólogos

### GET /psychologists — ok
Lista profissionais do tenant. Filtros permitidos: specialty, modality, location, weekday, maxPrice.

### GET /psychologists/:id — ok
Detalhe + horários livres.

---

## Disponibilidade

### GET /availability/:psychologistId — ok
Lista horários. Alias de `GET /scheduling/psychologist/:id`.

Cadastro/remoção: `POST /scheduling` e `DELETE /scheduling/:id` — requer papéis **PSYCHOLOGIST** ou **ADMIN**.

---

## Agendamentos

### POST /appointments — ok
Body: `{ patientId, psychologistId, availabilityId, notes? }`  
Nasce com status `PENDENTE`.

### GET /appointments/me — ok
Consultas do usuário logado (paciente ou psicólogo).

### PATCH /appointments/:id/accept — ok
Psicólogo ou admin aceita → `CONFIRMADA`.

### PATCH /appointments/:id/reject — ok
Psicólogo ou admin recusa → `RECUSADA`.

### PATCH /appointments/:id/cancel — ok
Cancela → `CANCELADA`.

---

## Notificações

### GET /notifications/me — ok
Lista notificações do usuário.

### PATCH /notifications/me/read-all — ok
Marca todas como lidas.

---

## Mensagens

### GET /messages — ok
Caixa do usuário (alias `/messages/me`).

### POST /messages — ok
Body: `{ recipientId, subject?, body }`

---

## Admin / auditoria

### GET /audit — ok
Somente **ADMIN**. Lista logs de auditoria do tenant.

### GET /therapeutic-bonds — ok
**ADMIN** (lista geral) · **PSYCHOLOGIST/ADMIN** em `/therapeutic-bonds/psychologist/:id`.

### GET /patients — ok
**PSYCHOLOGIST** ou **ADMIN**.

---

## Bloqueado

### GET /medical-records — 501
Prontuário não implementado nesta entrega (rota protegida, retorna 501).

---

## Integração frontend

Por padrão `VITE_USE_MOCKS=true`. Com `false` + `VITE_API_URL`, os services chamam a API.

| Service | Endpoints | Situação |
|---|---|---|
| authService | login, register, me | mock / real parcial |
| psychologistService | GET psychologists | real (mapper OK) / mock |
| appointmentService | appointments/* | mock / real parcial |
| notificationService | notifications/me | mock / real parcial |
| messageService | messages | mock (mapper pendente) |

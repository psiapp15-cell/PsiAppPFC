# Plano de wireframes — PsiApp (Figma)

Mapa para montar no Figma **igual ao wireframe de referência** (Telas Compartilhadas + Fluxo Paciente + Fluxo Psicólogo), alinhado ao código React em `frontend/src/`.

**Produto:** PsiApp · stack documentada em [`arquitetura.md`](arquitetura.md).

---

## Estrutura do canvas (como no anexo)

```
┌─────────────────────────────────────────────────────────────┐
│  Telas Compartilhadas                                        │
│  [Login] [Login alt] [Cadastro 1] [Cadastro 2]               │
├──────────────────────────────┬──────────────────────────────┤
│  Fluxo Paciente (7)          │  Fluxo Psicólogo (6–7)       │
│  sidebar + conteúdo          │  sidebar + conteúdo          │
└──────────────────────────────┴──────────────────────────────┘
```

Cada tela: **frame 1440 × 900**, fundo claro, **sticky note amarelo** com anotação curta.

---

## Cores (styles locais no Figma)

Do wireframe original + tema do código (`frontend/src/theme.ts`):

| Nome Figma | Uso wireframe | Hex código |
|------------|---------------|------------|
| Alabaster / Buttery White | Fundo geral | `#F7F3ED` (`palette.bg`) |
| White | Cards | `#FFFFFF` |
| Alto / Cod Gray | Bordas, placeholders | `#E6DED4` / `#6F6A64` |
| Black / Black Oil | Texto | `#1F1F1F` |
| Blumine / psiGreen | Botão primário, sidebar ativa | `#5F7F62` |
| Blizzard Blue | Acento secundário | `#C2E5FF` |
| Cameo | Áreas suaves | `#F7F3ED` |

**Tipografia:** Inter (Bold títulos, Regular corpo) — igual ao Mantine theme.

---

## Página: Componentes (criar primeiro)

Montar nesta ordem; as telas só instanciam estes blocos.

| # | Componente | Origem no código | Notas wireframe |
|---|------------|------------------|-----------------|
| 1 | `Frame / Tela desktop` | — | 1440×900, padding 0 |
| 2 | `Sidebar / Paciente` | `Sidebar.tsx` patientItems | Ícones: Início, Consultas, Busca |
| 3 | `Sidebar / Psicólogo` | `Sidebar.tsx` psychologistItems | Painel, Solicitações, Agenda… |
| 4 | `Topbar` | `Topbar.tsx` | Busca + avatar |
| 5 | `Auth / Shell` | `AuthShell.tsx` | Coluna esquerda + formulário |
| 6 | `Input / Texto` | Mantine TextInput | Label + campo + borda |
| 7 | `Button / Primário` | Mantine Button `psiGreen` | Radius pill |
| 8 | `Card / Base` | `.psi-card` | Branco, radius 20, sombra leve |
| 9 | `Card / Consulta` | `AppointmentCard.tsx` | Avatar + data + botões |
| 10 | `Card / Psicólogo resultado` | `PsychologistResultCard.tsx` | Foto, CRP, especialidade |
| 11 | `Card / Psicólogo dashboard` | `PsychologistCard.tsx` | Meu psicólogo |
| 12 | `Lista / Item` | várias listas | Linha + badge status |
| 13 | `Sticky / Anotação` | — | Amarelo, texto 11px |
| 14 | `Badge / Status` | `display.ts` statusMeta | PENDENTE, CONFIRMADA… |

---

## Telas Compartilhadas

| Frame Figma | Rota real | Arquivo |
|-------------|-----------|---------|
| Login | `/login` | `pages/Login.tsx` |
| Login (variação) | `/login` | mesmo — estado alternativo |
| Cadastro — passo 1 | `/register` | `pages/Register.tsx` |
| Cadastro — passo 2 | `/register` | seletor Sou Paciente / Sou Psicólogo |

**Blocos visuais:** logo PsiApp, campos e-mail/senha, botão Entrar/Criar conta, link trocar login↔cadastro.

---

## Fluxo Paciente

| Frame Figma (anexo) | Rota | Arquivo | Conteúdo principal |
|---------------------|------|---------|-------------------|
| Paciente-Busca | `/patient/search` | `PatientSearch.tsx` | Filtros + grid de cards |
| Paciente-Perfil-Psicólogo | `/patient/psychologist/p1` | `PsychologistDetail.tsx` | Bio, CRP, horários |
| Paciente-Agendamento | `/patient/psychologist/p1` | `PsychologistDetail.tsx` | Seleção de slot |
| Paciente-Confirmação | (toast/modal) | `PsychologistDetail.tsx` | “Consulta PENDENTE” |
| Paciente-Agenda | `/patient/appointments` | `PatientAppointments.tsx` | Abas por status |
| Paciente-Chat | — | *não implementado* | Wireframe conceitual — chat simples |
| Paciente-Histórico | `/patient/dashboard` | `RecentHistoryCard.tsx` | Lista histórico |

**Dashboard paciente** (`/patient/dashboard`) — incluir como frame extra se quiser completar:
`PatientDashboard.tsx` + cards: humor, consulta, gráfico, psicólogo, metas.

---

## Fluxo Psicólogo

| Frame Figma | Rota | Arquivo |
|-------------|------|---------|
| Dashboard | `/psychologist/dashboard` | `PsychologistDashboard.tsx` |
| Disponibilidade | `/psychologist/availability` | `PsychologistAvailability.tsx` |
| Solicitações | `/psychologist/requests` | `PsychologistRequests.tsx` |
| Agenda | `/psychologist/schedule` | `PsychologistSchedule.tsx` |
| Mensagens | `/psychologist/messages` | `PsychologistMessages.tsx` |
| Prontuário | `/psychologist/record` | `PsychologistRecord.tsx` |

Layout comum: **Sidebar psicólogo** + área principal com título (`PageSkeleton`).

---

## Ordem de execução no Figma (com Cursor MCP)

1. **Variables/styles** — cores e Inter  
2. **Componentes** — sidebar, card, input, button  
3. **Telas Compartilhadas** — 4 frames  
4. **Fluxo Paciente** — 7 frames (+ dashboard opcional)  
5. **Fluxo Psicólogo** — 6 frames  
6. **Revisão visual** — comparar com screenshot de referência  
7. *(Opcional)* Captura do app rodando (`localhost:5173`) pra alinhar pixel a pixel  

---

## Comando pra rodar o front (captura / referência)

```bash
cd frontend
npm install
npm run dev
```

Login mock: qualquer e-mail; perfil define paciente ou psicólogo.

---

## Checklist antes de apresentar

- [x] 17+ frames nomeados (Login, Paciente-*, Psicólogo-*)
- [x] Sticky note em cada tela wireframe
- [x] Página **Componentes** separada
- [x] Cores locais aplicadas
- [x] Textos em português brasileiro
- [x] Link do Figma em `docs/apresentacao.md` e `docs/guia.md`
- [x] Capturas reais em `docs/prints/` e página **Capturas · app real** no Figma

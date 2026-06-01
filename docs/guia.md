# PsiApp — Guia de Prints

Telas para anexar na documentação acadêmica e na apresentação.

**Stack do app:** front React/Vite/Mantine · back NestJS/Prisma · ver [`arquitetura.md`](arquitetura.md).

## Captura automática

```bash
cd frontend && npm run dev
# Em outro terminal, na raiz do repo:
$env:PSIAPP_URL='http://localhost:5176'   # ajuste a porta se o Vite usar outra
node scripts/capture-screenshots.mjs
```

Os PNGs ficam em `docs/prints/` (1440×900 desktop; mobile 390×844).

| Arquivo | Tela | Rota |
|---------|------|------|
| `01-login.png` | Login | `/login` |
| `02-cadastro.png` | Cadastro | `/register` |
| `03-landing.png` | Landing | `/` |
| `04-dashboard-paciente.png` | Dashboard paciente | `/patient/dashboard` |
| `05-busca.png` | Busca | `/patient/search` |
| `06-perfil-psicologo.png` | Perfil do psicólogo | `/patient/psychologist/p1` |
| `07-consultas.png` | Minhas consultas | `/patient/appointments` |
| `08-dashboard-psicologo.png` | Painel psicólogo | `/psychologist/dashboard` |
| `09-disponibilidade.png` | Disponibilidade | `/psychologist/availability` |
| `10-solicitacoes.png` | Solicitações | `/psychologist/requests` |
| `11-agenda.png` | Agenda | `/psychologist/schedule` |
| `12-mensagens.png` | Mensagens | `/psychologist/messages` |
| `13-prontuario.png` | Prontuário | `/psychologist/record` |
| `14-mobile-dashboard.png` | Mobile | `/patient/dashboard` |

## Figma

Wireframes e capturas reais: [PsiApp — Frames](https://www.figma.com/design/jnhOmxhkg5Vup3z0iOsqQs/PsiApp---Frames)

- **Wireframes · responsivo** — telas BF com componentes reutilizáveis
- **Capturas · app real** — screenshots do app rodando, alinhados aos nomes dos wireframes

Wireframes: `docs/figma-wireframes-plano.md` · Figma [PsiApp — Frames](https://www.figma.com/design/jnhOmxhkg5Vup3z0iOsqQs/PsiApp---Frames)

## Captura manual (opcional)

Login mock: qualquer e-mail; seletor define paciente ou psicólogo.

Telas extras úteis na demo ao vivo:

| # | Tela | Rota |
|---|------|------|
| — | Filtros aplicados | `/patient/search` |
| — | Confirmar agendamento | `/patient/psychologist/p1` |
| — | Aceitar consulta | `/psychologist/requests` |

## Sequência da demo

1. Buscar → filtrar → abrir perfil
2. Solicitar horário (PENDENTE)
3. Psicólogo aceita
4. Paciente vê CONFIRMADA

Mostra a regra: solicitação → análise → aceite.

/**
 * Captura PNGs das telas do PsiApp (1440×900) para docs/prints e Figma.
 * Uso: node scripts/capture-screenshots.mjs
 * Requer: frontend rodando em http://localhost:5173
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'docs', 'prints');
const BASE = process.env.PSIAPP_URL ?? 'http://localhost:5173';

mkdirSync(OUT, { recursive: true });

const patientRoutes = [
  { file: '04-dashboard-paciente', path: '/patient/dashboard' },
  { file: '05-busca', path: '/patient/search' },
  { file: '06-perfil-psicologo', path: '/patient/psychologist/p1' },
  { file: '07-consultas', path: '/patient/appointments' },
];

const psychologistRoutes = [
  { file: '08-dashboard-psicologo', path: '/psychologist/dashboard' },
  { file: '09-disponibilidade', path: '/psychologist/availability' },
  { file: '10-solicitacoes', path: '/psychologist/requests' },
  { file: '11-agenda', path: '/psychologist/schedule' },
  { file: '12-mensagens', path: '/psychologist/messages' },
  { file: '13-prontuario', path: '/psychologist/record' },
];

async function setAuth(page, role) {
  const patient = {
    id: 'u1',
    name: 'Camila Souza',
    email: 'camila.souza@email.com',
    role: 'patient',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop&crop=faces',
  };
  const psychologist = {
    id: 'p1',
    name: 'Dra. Ana Costa',
    email: 'ana.costa@email.com',
    role: 'psychologist',
    avatar:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=faces',
  };
  await page.addInitScript(({ role, patient, psychologist }) => {
    const user = role === 'patient' ? patient : psychologist;
    localStorage.setItem(
      'psiapp-auth',
      JSON.stringify({ state: { user, isAuthenticated: true }, version: 0 })
    );
  }, { role, patient, psychologist });
}

async function shot(page, file, path) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  const out = join(OUT, `${file}.png`);
  await page.screenshot({ path: out, fullPage: false });
  console.log('OK', out);
}

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

const page = await context.newPage();

// Públicas
await shot(page, '01-login', '/login');
await shot(page, '02-cadastro', '/register');
await shot(page, '03-landing', '/');

// Paciente (sessão mock via localStorage)
await setAuth(page, 'patient');
for (const r of patientRoutes) await shot(page, r.file, r.path);

// Psicólogo
await page.context().clearCookies();
const psiContext = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const psiPage = await psiContext.newPage();
await setAuth(psiPage, 'psychologist');
for (const r of psychologistRoutes) await shot(psiPage, r.file, r.path);

// Mobile paciente
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const mPage = await mobile.newPage();
await setAuth(mPage, 'patient');
await mPage.goto(`${BASE}/patient/dashboard`, { waitUntil: 'domcontentloaded' });
await mPage.waitForTimeout(1200);
await mPage.screenshot({
  path: join(OUT, '14-mobile-dashboard.png'),
  fullPage: false,
});
console.log('OK', join(OUT, '14-mobile-dashboard.png'));

await browser.close();
console.log('Done —', OUT);

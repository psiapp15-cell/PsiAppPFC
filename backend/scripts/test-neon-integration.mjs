const base = process.env.API_BASE ?? 'http://localhost:3333';

async function req(method, path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${base}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }
  return { status: res.status, json };
}

const results = [];

function ok(name, pass, detail = '') {
  results.push({ name, pass, detail });
  console.log(`${pass ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
}

try {
  const health = await req('GET', '/health');
  ok('GET /health', health.status === 200 && health.json?.status === 'ativo', `status ${health.status}`);

  const login = await req('POST', '/api/auth/login', {
    email: 'ana.costa@email.com',
    password: '123456',
  });
  const token = login.json?.accessToken;
  ok(
    'POST /api/auth/login (Neon)',
    login.status === 201 && !!token,
    `status ${login.status}, role ${login.json?.user?.role}`
  );

  const psy = await req('GET', '/api/psychologists', null, token);
  const count = Array.isArray(psy.json) ? psy.json.length : 0;
  ok('GET /api/psychologists', psy.status === 200 && count >= 1, `${count} registro(s)`);

  const me = await req('GET', '/api/auth/me', null, token);
  ok('GET /api/auth/me', me.status === 200 && me.json?.email === 'ana.costa@email.com', me.json?.email);

  const bad = await req('GET', '/api/psychologists');
  ok('GET /api/psychologists sem token → 401', bad.status === 401, `status ${bad.status}`);
} catch (e) {
  console.error('Falha de conexão — o backend está rodando em', base, '?');
  console.error(e.message);
  process.exit(1);
}

const failed = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - failed}/${results.length} testes de integração OK`);
process.exit(failed ? 1 : 0);

import './nest-app';
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from './nest-app';

describe('Autenticação — validação Zod (sem banco)', () => {
  it('POST /api/auth/register com body vazio retorna 400', async () => {
    const res = await request(app.getHttpServer()).post('/api/auth/register').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('POST /api/auth/register com e-mail inválido retorna 400', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({ tenantId: 't1', name: 'Ana', email: 'nao-eh-email', password: '123456' });
    expect(res.status).toBe(400);
  });

  it('POST /api/auth/login com body inválido retorna 400', async () => {
    const res = await request(app.getHttpServer()).post('/api/auth/login').send({ email: 'x' });
    expect(res.status).toBe(400);
  });

  it('GET /api/auth/me sem token retorna 401', async () => {
    const res = await request(app.getHttpServer()).get('/api/auth/me');
    expect(res.status).toBe(401);
  });
});

import './nest-app';
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from './nest-app';

describe('rotas protegidas pedem token', () => {
  const rotas: Array<[string, 'get' | 'patch']> = [
    ['/api/psychologists', 'get'],
    ['/api/psychologists/p1', 'get'],
    ['/api/availability/p1', 'get'],
    ['/api/appointments/me', 'get'],
    ['/api/appointments/abc/accept', 'patch'],
    ['/api/appointments/abc/reject', 'patch'],
    ['/api/appointments/abc/cancel', 'patch'],
    ['/api/notifications/me', 'get'],
    ['/api/medical-records', 'get'],
  ];

  it.each(rotas)('%s sem Authorization -> 401', async (path, method) => {
    const res = await request(app.getHttpServer())[method](path);
    expect(res.status).toBe(401);
  });
});

describe('POST /api/appointments', () => {
  it('sem token retorna 401 antes de validar body', async () => {
    const res = await request(app.getHttpServer()).post('/api/appointments').send({});
    expect(res.status).toBe(401);
  });
});

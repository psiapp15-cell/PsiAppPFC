import './nest-app';
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from './nest-app';
import { signRefreshToken } from '../src/shared/utils/jwt';

describe('POST /api/auth/refresh', () => {
  it('sem body válido → 400', async () => {
    const res = await request(app.getHttpServer()).post('/api/auth/refresh').send({});
    expect(res.status).toBe(400);
  });

  it('token de renovação inválido → 401', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: 'xxx' });
    expect(res.status).toBe(401);
  });

  it('token de renovação válido → 200 com novos tokens', async () => {
    const token = signRefreshToken({ sub: 'u1', role: 'PATIENT', tenantId: 't1' });
    const res = await request(app.getHttpServer())
      .post('/api/auth/refresh')
      .send({ refreshToken: token });
    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.refreshToken).toBeTruthy();
  });
});

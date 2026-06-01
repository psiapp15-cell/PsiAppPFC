import './nest-app';
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from './nest-app';

describe('Verificação de saúde', () => {
  it('GET /health responde 200 com status ativo', async () => {
    const res = await request(app.getHttpServer()).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ativo');
    expect(res.body.servico).toBe('psiapp-backend');
  });
});

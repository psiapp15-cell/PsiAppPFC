import { afterAll, beforeAll } from 'vitest';
import type { INestApplication } from '@nestjs/common';
import { createApp } from '../src/bootstrap';

export let app: INestApplication;

beforeAll(async () => {
  app = await createApp();
});

afterAll(async () => {
  await app?.close();
});

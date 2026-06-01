import { NestFactory } from '@nestjs/core';
import { RequestMethod, type INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AppErrorFilter } from './common/filters/app-error.filter';
import { env } from './config/env';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, { logger: false });

  app.use(helmet());
  app.enableCors({ origin: env.CORS_ORIGIN });
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  app.useGlobalFilters(new AppErrorFilter());

  await app.init();
  return app;
}

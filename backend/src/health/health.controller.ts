import { Controller, Get } from '@nestjs/common';
import { env } from '../config/env';

@Controller()
export class HealthController {
  @Get('health')
  health() {
    return {
      status: 'ativo',
      servico: 'psiapp-backend',
      ambiente: env.NODE_ENV,
    };
  }
}

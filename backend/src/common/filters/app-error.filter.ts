import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import type { Response } from 'express';
import { AppError } from '../../shared/errors/AppError';

@Catch()
export class AppErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (exception instanceof AppError) {
      return res.status(exception.statusCode).json({
        error: exception.message,
        details: exception.details ?? undefined,
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      return res.status(status).json(
        typeof body === 'string' ? { error: body } : body
      );
    }

    console.error('[erro não tratado]', exception);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

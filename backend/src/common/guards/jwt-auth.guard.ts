import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AppError } from '../../shared/errors/AppError';
import { verifyToken } from '../../shared/utils/jwt';
import type { AuthenticatedRequest } from '../types/authenticated-request';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new AppError(401, 'Token de autenticação ausente ou inválido.');
    }

    const token = header.slice(7);
    try {
      const payload = verifyToken(token);
      req.user = payload;
      req.tenantId = payload.tenantId;
      return true;
    } catch {
      throw new AppError(401, 'Token inválido ou expirado.');
    }
  }
}

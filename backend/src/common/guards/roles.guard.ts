import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppError } from '../../shared/errors/AppError';
import { ROLES_KEY } from '../decorators/roles.decorator';
import type { AuthenticatedRequest } from '../types/authenticated-request';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles?.length) {
      return true;
    }

    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!req.user) {
      throw new AppError(401, 'Não autenticado.');
    }
    if (!roles.includes(req.user.role)) {
      throw new AppError(403, 'Acesso negado para o seu perfil.');
    }
    return true;
  }
}

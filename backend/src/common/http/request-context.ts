import { AppError } from '../../shared/errors/AppError';
import type { AuthenticatedRequest } from '../types/authenticated-request';

export function requireTenant(req: AuthenticatedRequest): string {
  if (!req.tenantId) {
    throw new AppError(400, 'Tenant não identificado (JWT ou header x-tenant-id).');
  }
  return req.tenantId;
}

export function requireUserId(req: AuthenticatedRequest): string {
  if (!req.user?.sub) {
    throw new AppError(401, 'Não autenticado.');
  }
  return req.user.sub;
}

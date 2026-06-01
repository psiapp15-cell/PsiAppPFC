import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Response } from 'express';
import type { AuthenticatedRequest } from '../types/authenticated-request';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
    if (!req.tenantId) {
      const headerTenant = req.header('x-tenant-id');
      if (headerTenant) {
        req.tenantId = headerTenant;
      }
    }
    next();
  }
}

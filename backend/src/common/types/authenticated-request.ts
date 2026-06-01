import type { Request } from 'express';
import type { JwtPayload } from '../../shared/utils/jwt';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
  tenantId?: string;
}

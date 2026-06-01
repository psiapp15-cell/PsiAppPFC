import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import type { AuthenticatedRequest } from '../../common/types/authenticated-request';
import { requireTenant, requireUserId } from '../../common/http/request-context';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { listNotificationsForUser, markAllNotificationsRead } from './service';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  @Get('me')
  listMine(@Req() req: AuthenticatedRequest) {
    return listNotificationsForUser(requireTenant(req), requireUserId(req));
  }

  @Patch('me/read-all')
  markAllRead(@Req() req: AuthenticatedRequest) {
    return markAllNotificationsRead(requireTenant(req), requireUserId(req));
  }
}

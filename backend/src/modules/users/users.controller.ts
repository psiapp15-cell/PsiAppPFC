import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import type { AuthenticatedRequest } from '../../common/types/authenticated-request';
import { requireTenant, requireUserId } from '../../common/http/request-context';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { getCurrentUser, getUserById, listUsers } from './service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  @Get()
  list(@Req() req: AuthenticatedRequest) {
    return listUsers(requireTenant(req));
  }

  @Get('me')
  me(@Req() req: AuthenticatedRequest) {
    return getCurrentUser(requireTenant(req), requireUserId(req));
  }

  @Get(':id')
  getById(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return getUserById(requireTenant(req), id);
  }
}

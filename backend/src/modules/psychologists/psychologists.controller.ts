import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import type { AuthenticatedRequest } from '../../common/types/authenticated-request';
import { requireTenant } from '../../common/http/request-context';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { getPsychologistById, listPsychologists } from './service';

@Controller('psychologists')
@UseGuards(JwtAuthGuard)
export class PsychologistsController {
  @Get()
  list(@Req() req: AuthenticatedRequest) {
    return listPsychologists(requireTenant(req));
  }

  @Get(':id')
  getById(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return getPsychologistById(requireTenant(req), id);
  }
}

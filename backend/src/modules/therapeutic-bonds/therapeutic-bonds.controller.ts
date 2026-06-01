import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import type { AuthenticatedRequest } from '../../common/types/authenticated-request';
import { requireTenant } from '../../common/http/request-context';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { listBonds, listBondsByPsychologist } from './service';

@Controller('therapeutic-bonds')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TherapeuticBondsController {
  @Get()
  @Roles('ADMIN')
  list(@Req() req: AuthenticatedRequest) {
    return listBonds(requireTenant(req));
  }

  @Get('psychologist/:psychologistId')
  @Roles('PSYCHOLOGIST', 'ADMIN')
  listByPsychologist(
    @Req() req: AuthenticatedRequest,
    @Param('psychologistId') psychologistId: string
  ) {
    return listBondsByPsychologist(requireTenant(req), psychologistId);
  }
}

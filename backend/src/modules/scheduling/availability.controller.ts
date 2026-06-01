import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import type { AuthenticatedRequest } from '../../common/types/authenticated-request';
import { requireTenant } from '../../common/http/request-context';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { listAvailabilityByPsychologist } from './service';

@Controller('availability')
@UseGuards(JwtAuthGuard)
export class AvailabilityController {
  @Get(':psychologistId')
  listByPsychologist(
    @Req() req: AuthenticatedRequest,
    @Param('psychologistId') psychologistId: string
  ) {
    return listAvailabilityByPsychologist(requireTenant(req), psychologistId);
  }
}

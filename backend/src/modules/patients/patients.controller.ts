import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import type { AuthenticatedRequest } from '../../common/types/authenticated-request';
import { requireTenant } from '../../common/http/request-context';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { getPatientById, listPatients } from './service';

@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
  @Get()
  @Roles('PSYCHOLOGIST', 'ADMIN')
  list(@Req() req: AuthenticatedRequest) {
    return listPatients(requireTenant(req));
  }

  @Get(':id')
  @Roles('PSYCHOLOGIST', 'ADMIN')
  getById(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return getPatientById(requireTenant(req), id);
  }
}

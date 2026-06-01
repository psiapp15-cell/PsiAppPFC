import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import type { AuthenticatedRequest } from '../../common/types/authenticated-request';
import { requireTenant, requireUserId } from '../../common/http/request-context';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { AppError } from '../../shared/errors/AppError';
import * as appointments from './service';
import { createAppointmentSchema } from './schemas';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  @Get('me')
  listMine(@Req() req: AuthenticatedRequest) {
    if (!req.user) throw new AppError(401, 'Não autenticado.');
    return appointments.listForUser(
      requireTenant(req),
      requireUserId(req),
      req.user.role
    );
  }

  @Get('psychologist/:psychologistId')
  listByPsychologist(
    @Req() req: AuthenticatedRequest,
    @Param('psychologistId') psychologistId: string
  ) {
    return appointments.listByPsychologist(requireTenant(req), psychologistId);
  }

  @Get('patient/:patientId')
  listByPatient(@Req() req: AuthenticatedRequest, @Param('patientId') patientId: string) {
    return appointments.listByPatient(requireTenant(req), patientId);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAppointmentSchema))
  create(@Req() req: AuthenticatedRequest, @Body() body: unknown) {
    return appointments.createRequest(
      requireTenant(req),
      body as Parameters<typeof appointments.createRequest>[1]
    );
  }

  @Patch(':id/accept')
  @UseGuards(RolesGuard)
  @Roles('PSYCHOLOGIST', 'ADMIN')
  accept(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return appointments.accept(requireTenant(req), id);
  }

  @Patch(':id/reject')
  @UseGuards(RolesGuard)
  @Roles('PSYCHOLOGIST', 'ADMIN')
  reject(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return appointments.reject(requireTenant(req), id);
  }

  @Patch(':id/cancel')
  cancel(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return appointments.cancel(requireTenant(req), id);
  }
}

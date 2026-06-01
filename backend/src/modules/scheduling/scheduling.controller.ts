import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import type { AuthenticatedRequest } from '../../common/types/authenticated-request';
import { requireTenant } from '../../common/http/request-context';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import {
  createAvailability,
  listAvailabilityByPsychologist,
  removeAvailability,
} from './service';
import { createAvailabilitySchema } from './schemas';

@Controller('scheduling')
@UseGuards(JwtAuthGuard)
export class SchedulingController {
  @Get('psychologist/:psychologistId')
  listByPsychologist(
    @Req() req: AuthenticatedRequest,
    @Param('psychologistId') psychologistId: string
  ) {
    return listAvailabilityByPsychologist(requireTenant(req), psychologistId);
  }

  @Post()
  @HttpCode(201)
  @UseGuards(RolesGuard)
  @Roles('PSYCHOLOGIST', 'ADMIN')
  @UsePipes(new ZodValidationPipe(createAvailabilitySchema))
  create(@Req() req: AuthenticatedRequest, @Body() body: unknown) {
    return createAvailability(
      requireTenant(req),
      body as Parameters<typeof createAvailability>[1]
    );
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('PSYCHOLOGIST', 'ADMIN')
  remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return removeAvailability(requireTenant(req), id);
  }
}

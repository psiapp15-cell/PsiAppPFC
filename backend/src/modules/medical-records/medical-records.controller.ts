import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { getMedicalRecord, listMedicalRecords } from './service';

@Controller('medical-records')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PSYCHOLOGIST', 'ADMIN')
export class MedicalRecordsController {
  @Get()
  list() {
    return listMedicalRecords();
  }

  @Get(':id')
  get() {
    return getMedicalRecord();
  }
}

import { Module } from '@nestjs/common';
import { PsychologistsController } from './psychologists.controller';

@Module({
  controllers: [PsychologistsController],
})
export class PsychologistsModule {}

import { Module } from '@nestjs/common';
import { TherapeuticBondsController } from './therapeutic-bonds.controller';

@Module({
  controllers: [TherapeuticBondsController],
})
export class TherapeuticBondsModule {}

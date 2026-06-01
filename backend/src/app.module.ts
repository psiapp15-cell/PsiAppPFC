import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TenantMiddleware } from './common/middleware/tenant.middleware';
import { HealthController } from './health/health.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PatientsModule } from './modules/patients/patients.module';
import { PsychologistsModule } from './modules/psychologists/psychologists.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { SchedulingModule } from './modules/scheduling/scheduling.module';
import { AvailabilityModule } from './modules/scheduling/availability.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { TherapeuticBondsModule } from './modules/therapeutic-bonds/therapeutic-bonds.module';
import { MedicalRecordsModule } from './modules/medical-records/medical-records.module';
import { MessagesModule } from './modules/messages/messages.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    PatientsModule,
    PsychologistsModule,
    TenantsModule,
    SchedulingModule,
    AvailabilityModule,
    AppointmentsModule,
    TherapeuticBondsModule,
    MedicalRecordsModule,
    MessagesModule,
    NotificationsModule,
    AuditModule,
  ],
  controllers: [HealthController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}

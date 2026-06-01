import { Body, Controller, Get, HttpCode, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { createTenant, listTenants } from './service';
import { createTenantSchema } from './schemas';

@Controller('tenants')
export class TenantsController {
  @Get()
  list() {
    return listTenants();
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createTenantSchema))
  create(@Body() body: unknown) {
    return createTenant(body as Parameters<typeof createTenant>[0]);
  }
}

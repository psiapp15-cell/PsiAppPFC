import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import type { AuthenticatedRequest } from '../../common/types/authenticated-request';
import { requireTenant, requireUserId } from '../../common/http/request-context';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import * as authService from './service';
import { loginSchema, refreshSchema, registerSchema } from './schemas';

@Controller('auth')
export class AuthController {
  @Post('register')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerSchema))
  register(@Body() body: unknown) {
    return authService.register(body as Parameters<typeof authService.register>[0]);
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  login(@Body() body: unknown) {
    return authService.login(body as Parameters<typeof authService.login>[0]);
  }

  @Post('refresh')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(refreshSchema))
  refresh(@Body() body: { refreshToken: string }) {
    return authService.refresh(body.refreshToken);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: AuthenticatedRequest) {
    return authService.me(requireTenant(req), requireUserId(req));
  }
}

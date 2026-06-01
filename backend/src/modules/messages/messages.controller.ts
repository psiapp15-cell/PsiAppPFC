import { Body, Controller, Get, HttpCode, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import type { AuthenticatedRequest } from '../../common/types/authenticated-request';
import { requireTenant, requireUserId } from '../../common/http/request-context';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { listMessagesForUser, sendMessage } from './service';
import { sendMessageSchema } from './schemas';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  @Get()
  list(@Req() req: AuthenticatedRequest) {
    return listMessagesForUser(requireTenant(req), requireUserId(req));
  }

  @Get('me')
  listMe(@Req() req: AuthenticatedRequest) {
    return listMessagesForUser(requireTenant(req), requireUserId(req));
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(sendMessageSchema))
  create(@Req() req: AuthenticatedRequest, @Body() body: unknown) {
    return sendMessage(
      requireTenant(req),
      requireUserId(req),
      body as Parameters<typeof sendMessage>[2]
    );
  }
}

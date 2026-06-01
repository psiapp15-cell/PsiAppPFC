import { prisma } from '../../shared/prisma/prismaClient';
import type { SendMessageInput } from './schemas';

export function listMessagesForUser(tenantId: string, userId: string) {
  return prisma.message.findMany({
    where: { tenantId, recipientId: userId },
    orderBy: { createdAt: 'desc' },
  });
}

export function sendMessage(tenantId: string, senderId: string, input: SendMessageInput) {
  return prisma.message.create({
    data: {
      tenantId,
      senderId,
      recipientId: input.recipientId,
      subject: input.subject,
      body: input.body,
    },
  });
}

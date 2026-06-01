import { prisma } from '../../shared/prisma/prismaClient';

export function listNotificationsForUser(tenantId: string, userId: string) {
  return prisma.notification.findMany({
    where: { tenantId, userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function markAllNotificationsRead(tenantId: string, userId: string) {
  await prisma.notification.updateMany({
    where: { tenantId, userId, read: false },
    data: { read: true },
  });
  return { ok: true };
}

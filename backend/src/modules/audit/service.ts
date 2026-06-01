import { prisma } from '../../shared/prisma/prismaClient';

export function listAuditLogs(tenantId: string) {
  return prisma.auditLog.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' },
    take: 200,
  });
}

export function recordAuditLog(input: {
  tenantId: string;
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}) {
  return prisma.auditLog.create({
    data: {
      tenantId: input.tenantId,
      userId: input.userId,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId,
      metadata: input.metadata as object | undefined,
    },
  });
}

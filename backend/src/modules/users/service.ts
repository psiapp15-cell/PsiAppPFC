import { prisma } from '../../shared/prisma/prismaClient';
import { AppError } from '../../shared/errors/AppError';

const publicSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  tenantId: true,
  createdAt: true,
} as const;

export function listUsers(tenantId: string) {
  return prisma.user.findMany({ where: { tenantId }, select: publicSelect });
}

export async function getUserById(tenantId: string, id: string) {
  const user = await prisma.user.findFirst({
    where: { id, tenantId },
    select: publicSelect,
  });
  if (!user) throw new AppError(404, 'Usuário não encontrado.');
  return user;
}

export async function getCurrentUser(tenantId: string, userId: string) {
  return getUserById(tenantId, userId);
}

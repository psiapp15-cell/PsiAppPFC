import { prisma } from '../../shared/prisma/prismaClient';
import { AppError } from '../../shared/errors/AppError';

export function listTenants() {
  return prisma.tenant.findMany({ select: { id: true, name: true, slug: true, createdAt: true } });
}

export async function createTenant(input: { name: string; slug: string }) {
  const exists = await prisma.tenant.findUnique({ where: { slug: input.slug } });
  if (exists) throw new AppError(409, 'Slug de tenant já existe.');
  return prisma.tenant.create({ data: input });
}

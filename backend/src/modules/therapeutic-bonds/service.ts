import { prisma } from '../../shared/prisma/prismaClient';

export function listBonds(tenantId: string) {
  return prisma.therapeuticBond.findMany({ where: { tenantId } });
}

export function listBondsByPsychologist(tenantId: string, psychologistId: string) {
  return prisma.therapeuticBond.findMany({ where: { tenantId, psychologistId } });
}

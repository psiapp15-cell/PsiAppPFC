import { prisma } from '../../shared/prisma/prismaClient';
import type { CreateAvailabilityInput } from './schemas';

export function listAvailabilityByPsychologist(tenantId: string, psychologistId: string) {
  return prisma.availability.findMany({
    where: { tenantId, psychologistId },
    orderBy: [{ date: 'asc' }, { time: 'asc' }],
  });
}

export function createAvailability(tenantId: string, input: CreateAvailabilityInput) {
  // TODO: checar se psychologistId pertence ao tenant
  return prisma.availability.create({
    data: {
      tenantId,
      psychologistId: input.psychologistId,
      date: input.date,
      time: input.time,
      modality: input.modality,
    },
  });
}

export async function removeAvailability(tenantId: string, id: string) {
  await prisma.availability.deleteMany({ where: { id, tenantId } });
  return { id };
}

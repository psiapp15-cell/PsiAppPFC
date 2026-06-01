import { prisma } from '../../shared/prisma/prismaClient';
import { AppError } from '../../shared/errors/AppError';

export function listPsychologists(tenantId: string) {
  return prisma.psychologistProfile.findMany({
    where: { tenantId },
    include: { user: { select: { id: true, name: true, email: true } } },
  });
}

export async function getPsychologistById(tenantId: string, id: string) {
  const profile = await prisma.psychologistProfile.findFirst({
    where: { id, tenantId },
    include: {
      user: { select: { id: true, name: true, email: true } },
      availabilities: { where: { isBooked: false } },
    },
  });
  if (!profile) throw new AppError(404, 'Psicólogo não encontrado.');
  return profile;
}

import { prisma } from '../../shared/prisma/prismaClient';
import { AppError } from '../../shared/errors/AppError';

export function listPatients(tenantId: string) {
  return prisma.patientProfile.findMany({
    where: { tenantId },
    include: { user: { select: { id: true, name: true, email: true } } },
  });
}

export async function getPatientById(tenantId: string, id: string) {
  const profile = await prisma.patientProfile.findFirst({
    where: { id, tenantId },
    include: { user: { select: { id: true, name: true, email: true } } },
  });
  if (!profile) throw new AppError(404, 'Paciente não encontrado.');
  return profile;
}

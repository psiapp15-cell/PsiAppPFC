import { prisma } from '../../shared/prisma/prismaClient';
import { AppError } from '../../shared/errors/AppError';
import type { CreateAppointmentInput } from './schemas';

export function listByPsychologist(tenantId: string, psychologistId: string) {
  return prisma.appointment.findMany({
    where: { tenantId, psychologistId },
    orderBy: { createdAt: 'desc' },
  });
}

export function listByPatient(tenantId: string, patientId: string) {
  return prisma.appointment.findMany({
    where: { tenantId, patientId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function listForUser(tenantId: string, userId: string, role: string) {
  if (role === 'PSYCHOLOGIST') {
    const profile = await prisma.psychologistProfile.findFirst({
      where: { userId, tenantId },
      select: { id: true },
    });
    return profile ? listByPsychologist(tenantId, profile.id) : [];
  }
  const profile = await prisma.patientProfile.findFirst({
    where: { userId, tenantId },
    select: { id: true },
  });
  return profile ? listByPatient(tenantId, profile.id) : [];
}

export async function createRequest(tenantId: string, input: CreateAppointmentInput) {
  // FIXME: deveria pegar patientId do usuário logado, não confiar no body
  const availability = await prisma.availability.findFirst({
    where: { id: input.availabilityId, tenantId },
  });
  if (!availability) throw new AppError(404, 'Horário indisponível.');
  if (availability.isBooked) throw new AppError(409, 'Horário já reservado.');

  return prisma.appointment.create({
    data: {
      tenantId,
      patientId: input.patientId,
      psychologistId: input.psychologistId,
      availabilityId: input.availabilityId,
      scheduledAt: availability.date,
      notes: input.notes,
      status: 'PENDENTE',
    },
  });
}

export async function accept(tenantId: string, id: string) {
  const appointment = await prisma.appointment.findFirst({ where: { id, tenantId } });
  if (!appointment) throw new AppError(404, 'Agendamento não encontrado.');
  if (appointment.status !== 'PENDENTE') {
    throw new AppError(409, 'Somente solicitações pendentes podem ser aceitas.');
  }

  const [updated] = await prisma.$transaction([
    prisma.appointment.update({ where: { id }, data: { status: 'CONFIRMADA' } }),
    ...(appointment.availabilityId
      ? [
          prisma.availability.update({
            where: { id: appointment.availabilityId },
            data: { isBooked: true },
          }),
        ]
      : []),
  ]);
  return updated;
}

export async function reject(tenantId: string, id: string) {
  const appointment = await prisma.appointment.findFirst({ where: { id, tenantId } });
  if (!appointment) throw new AppError(404, 'Agendamento não encontrado.');
  if (appointment.status !== 'PENDENTE') {
    throw new AppError(409, 'Somente solicitações pendentes podem ser recusadas.');
  }
  return prisma.appointment.update({ where: { id }, data: { status: 'RECUSADA' } });
}

export async function cancel(tenantId: string, id: string) {
  const appointment = await prisma.appointment.findFirst({ where: { id, tenantId } });
  if (!appointment) throw new AppError(404, 'Agendamento não encontrado.');
  if (appointment.status !== 'PENDENTE' && appointment.status !== 'CONFIRMADA') {
    throw new AppError(409, 'Esta consulta não pode ser cancelada.');
  }
  return prisma.appointment.update({ where: { id }, data: { status: 'CANCELADA' } });
}

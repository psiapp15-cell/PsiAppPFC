import type { AppointmentStatus, Modality } from '../types';

export const modalityLabel: Record<Modality, string> = {
  online: 'On-line',
  presencial: 'Presencial',
  hibrido: 'Híbrido',
};

export const statusMeta: Record<
  AppointmentStatus,
  { label: string; color: string }
> = {
  PENDENTE: { label: 'Pendente', color: 'yellow' },
  CONFIRMADA: { label: 'Confirmada', color: 'psiGreen' },
  RECUSADA: { label: 'Recusada', color: 'red' },
  CANCELADA: { label: 'Cancelada', color: 'gray' },
  REALIZADA: { label: 'Realizada', color: 'psiTeal' },
};

export function priceRangeLabel(min: number, max: number): string {
  if (min === max) return `R$ ${min}`;
  return `R$ ${min} – ${max}`;
}

export function shortDate(iso: string): string {
  const [, m, d] = iso.split('-');
  return `${d}/${m}`;
}

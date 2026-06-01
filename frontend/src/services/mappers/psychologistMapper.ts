import type { Modality, Psychologist, AvailableSlot } from '../../types';

/** Shape retornado pelo Prisma/Nest em GET /psychologists */
export interface ApiPsychologistProfile {
  id: string;
  tenantId: string;
  userId: string;
  crp: string;
  specialty: string | null;
  approach: string | null;
  bio: string | null;
  user: { id: string; name: string; email: string };
  availabilities?: Array<{
    id: string;
    date: string;
    time: string;
    modality: string;
    isBooked?: boolean;
  }>;
}

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=faces';

function mapModality(raw?: string | null): Modality {
  const v = (raw ?? 'ONLINE').toUpperCase();
  if (v === 'PRESENCIAL') return 'presencial';
  if (v === 'HIBRIDO' || v === 'HÍBRIDO') return 'hibrido';
  return 'online';
}

function inferModalityFromSlots(
  slots: ApiPsychologistProfile['availabilities']
): Modality {
  if (!slots?.length) return 'online';
  const kinds = new Set(slots.map((s) => mapModality(s.modality)));
  if (kinds.size > 1) return 'hibrido';
  return kinds.values().next().value ?? 'online';
}

function mapSlots(
  slots: ApiPsychologistProfile['availabilities']
): AvailableSlot[] {
  if (!slots?.length) return [];
  return slots
    .filter((s) => !s.isBooked)
    .map((s) => {
      const date = new Date(s.date);
      const weekday = date
        .toLocaleDateString('pt-BR', { weekday: 'short' })
        .replace('.', '');
      const isoDate = date.toISOString().slice(0, 10);
      return {
        id: s.id,
        weekday,
        date: isoDate,
        time: s.time,
      };
    });
}

export function mapApiPsychologist(profile: ApiPsychologistProfile): Psychologist {
  const availableSlots = mapSlots(profile.availabilities);
  return {
    id: profile.id,
    name: profile.user.name,
    crp: profile.crp,
    approach: profile.approach ?? 'Abordagem integrativa',
    specialty: profile.specialty ?? 'Clínica',
    rating: 4.8,
    reviews: 0,
    modality: inferModalityFromSlots(profile.availabilities),
    location: 'Atendimento on-line e presencial',
    priceMin: 120,
    priceMax: 180,
    description: profile.bio ?? profile.approach ?? 'Perfil profissional.',
    availableSlots,
    avatar: DEFAULT_AVATAR,
  };
}

export function mapApiPsychologists(
  list: ApiPsychologistProfile[]
): Psychologist[] {
  return list.map(mapApiPsychologist);
}

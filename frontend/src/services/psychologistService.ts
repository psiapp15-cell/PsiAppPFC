import { psychologists } from '../mocks/data';
import type { Psychologist, PsychologistFilters } from '../types';
import { ApiError, delay } from './http';
import { USE_MOCKS } from '../config/runtime';
import { apiRequest } from './apiClient';
import {
  mapApiPsychologist,
  mapApiPsychologists,
  type ApiPsychologistProfile,
} from './mappers/psychologistMapper';

function applyFilters(
  list: Psychologist[],
  f: PsychologistFilters
): Psychologist[] {
  return list.filter((p) => {
    if (f.specialty && p.specialty !== f.specialty) return false;
    if (f.modality !== 'all' && p.modality !== f.modality) return false;
    if (f.location && p.location !== f.location) return false;
    if (f.maxPrice && p.priceMin > f.maxPrice) return false;
    if (f.weekday && !p.availableSlots.some((s) => s.weekday === f.weekday))
      return false;
    return true;
  });
}

export async function listPsychologists(
  filters: PsychologistFilters
): Promise<Psychologist[]> {
  if (!USE_MOCKS) {
    const rows = await apiRequest<ApiPsychologistProfile[]>('/psychologists', {
      query: {
        specialty: filters.specialty || undefined,
        modality: filters.modality !== 'all' ? filters.modality : undefined,
        location: filters.location || undefined,
        weekday: filters.weekday || undefined,
        maxPrice: filters.maxPrice || undefined,
      },
    });
    return applyFilters(mapApiPsychologists(rows), filters);
  }
  return delay(applyFilters(psychologists, filters));
}

export async function getPsychologistById(id: string): Promise<Psychologist> {
  if (!USE_MOCKS) {
    const row = await apiRequest<ApiPsychologistProfile>(`/psychologists/${id}`);
    return mapApiPsychologist(row);
  }
  const found = psychologists.find((p) => p.id === id);
  if (!found) {
    return delay(null as never).then(() => {
      throw new ApiError('Psicólogo não encontrado.');
    });
  }
  return delay(found);
}

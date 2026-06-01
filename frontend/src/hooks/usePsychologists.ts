import { useQuery } from '@tanstack/react-query';
import {
  getPsychologistById,
  listPsychologists,
} from '../services/psychologistService';
import type { PsychologistFilters } from '../types';

export function usePsychologists(filters: PsychologistFilters) {
  return useQuery({
    queryKey: ['psychologists', filters],
    queryFn: () => listPsychologists(filters),
  });
}

export function usePsychologist(id: string | undefined) {
  return useQuery({
    queryKey: ['psychologist', id],
    queryFn: () => getPsychologistById(id as string),
    enabled: Boolean(id),
  });
}

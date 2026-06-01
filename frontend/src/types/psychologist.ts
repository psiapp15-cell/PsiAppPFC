
export type Modality = 'online' | 'presencial' | 'hibrido';

export interface AvailableSlot {
  id: string;
  
  date: string;
  
  weekday: string;
  
  time: string;
}

export interface Psychologist {
  id: string;
  name: string;
  
  crp: string;
  
  approach: string;
  
  specialty: string;
  rating: number;
  reviews: number;
  modality: Modality;
  
  location: string;
  
  priceMin: number;
  priceMax: number;
  description: string;
  availableSlots: AvailableSlot[];
  avatar: string;
}

export interface PsychologistFilters {
  specialty: string; // '' = todas
  modality: Modality | 'all';
  location: string; // '' = todas
  
  weekday: string;
  
  maxPrice: number;
}

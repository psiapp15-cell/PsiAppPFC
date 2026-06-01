import type { Modality } from './psychologist';

export interface PsychologistSlot {
  id: string;
  
  date: string;
  
  weekday: string;
  
  time: string;
  modality: Modality;
}

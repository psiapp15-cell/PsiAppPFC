import type { Modality, Psychologist } from './psychologist';

export type AppointmentStatus =
  | 'PENDENTE'
  | 'CONFIRMADA'
  | 'RECUSADA'
  | 'CANCELADA'
  | 'REALIZADA';

export interface PatientAppointment {
  id: string;
  psychologistId: string;
  psychologistName: string;
  psychologistAvatar: string;
  
  patientName: string;
  patientAvatar: string;
  specialty: string;
  modality: Modality;
  
  date: string;
  weekday: string;
  time: string;
  status: AppointmentStatus;
  
  createdAt: string;
}

export interface Appointment {
  id: string;
  psychologist: Pick<Psychologist, 'name' | 'approach' | 'avatar'>;
  date: string;
  time: string;
  modality: 'On-line' | 'Presencial';
  status?: 'Realizada' | 'Agendada' | 'Cancelada';
}

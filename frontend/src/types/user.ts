
export type UserRole = 'patient' | 'psychologist';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface LinkedPatient {
  id: string;
  name: string;
  avatar: string;
  
  focus: string;
  
  since: string;
  sessions: number;
}

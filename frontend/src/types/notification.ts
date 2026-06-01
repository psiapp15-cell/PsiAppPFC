import type { UserRole } from './user';

export type NotificationKind =
  | 'request'
  | 'confirm'
  | 'reject'
  | 'cancel'
  | 'system';

export interface InternalNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  message: string;
  
  createdAt: string;
  read: boolean;
  
  audience: UserRole;
}

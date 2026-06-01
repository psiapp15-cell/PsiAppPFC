
export interface AdminMessage {
  id: string;
  from: string;
  subject: string;
  body: string;
  
  date: string;
  read: boolean;
  priority: 'normal' | 'alta';
}

export interface Message {
  id: string;
  tenantId: string;
  senderId: string;
  recipientId: string;
  subject?: string;
  body: string;
  read: boolean;
  
  createdAt: string;
}

export interface SendMessageRequest {
  recipientId: string;
  subject?: string;
  body: string;
}

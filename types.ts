
export enum CaseStatus {
  ACTIVE = 'نشط',
  PENDING = 'قيد الانتظار',
  CLOSED = 'مغلق',
  APPEAL = 'استئناف'
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  nationalId: string;
  note?: string;
}

export interface HearingRecord {
  id: string;
  date: string;
  decision: string;
  notes: string;
}

export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  clientId: string;
  clientName: string;
  type: string;
  court: string;
  judge: string;
  status: CaseStatus;
  nextHearing: string;
  fees: number;
  paid: number;
  expenses: number; // المصاريف الإدارية
  hearingsHistory: HearingRecord[];
}

export interface OfficeTask {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Message {
  role: 'user' | 'model' | 'system';
  content: string;
}

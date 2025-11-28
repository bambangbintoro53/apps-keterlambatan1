export interface TardyRecord {
  id: string;
  name: string;
  nis: string;
  class: string;
  timestamp: number;
}

export interface Student {
  name: string;
  nis: string;
  class: string;
}

export type NewTardyRecord = Omit<TardyRecord, 'id' | 'timestamp'>;

export type FilterType = 'day' | 'month' | 'all';
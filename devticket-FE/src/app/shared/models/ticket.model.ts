export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'done';
}

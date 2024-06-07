import { Table } from './table';

export interface FormData {
  name: string;
  cpf: string;
  phoneNumber: string;
  date: Date;
  time: string;
  table: Table | null;
  employeeId: string;
  reservationId: string;
}

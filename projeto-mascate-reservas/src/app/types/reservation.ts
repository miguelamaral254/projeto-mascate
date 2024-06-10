import { Customer } from "./customer";
import { Employee } from "./employee";
import { Table } from "./table";


interface Reservation {
  idReservation: number;
  table: Table; 
  employee: Employee;
  customer: Customer
  reservationDate: string;
  time: string;
  checkin: boolean;
}

export default Reservation;

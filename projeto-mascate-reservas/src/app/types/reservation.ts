import { Table } from "./table";


interface Reservation {
  idReservation: number;
  tableId: number; // Adjusted to match the type in FormData
  employeeId: number;
  name: string;
  cpf: string;
  phoneNumber: string;
  reservationDate: string;
  time: string;
  checkin: boolean;
}

export default Reservation;

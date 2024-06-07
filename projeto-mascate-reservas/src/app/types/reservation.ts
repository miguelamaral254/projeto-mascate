export interface ReservationDetails {
  date: string;
  time: string;
  tableId: number;
}

export interface Reservation {
  id: number;
  customerName: string;
  cpf: string;
  phoneNumber: string;
  employeeId: string;
  reservationId: string;
  reservation: ReservationDetails;
}

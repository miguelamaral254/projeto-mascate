export interface ReservationDetails {
  date: string;
  time: string;
  tableNumber: number;
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

export interface Reservation {
  idReservation: number;
  tableId: {
    tableID: number;
    availability: boolean;
    chairs: number;
    type: string;
    size: string;
  };
  employeeId: {
    name: string;
    reservationsMade: number;
  };
  cpf: {
    name: string;
    cpf: string;
    phoneNumber: string;
  };
  name: string;
  phoneNumber: string;
  reservationDate: string;
  time: string;
  checkin: boolean;
}

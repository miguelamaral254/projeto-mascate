import React from 'react';

interface Reservation {
    id: number;
    customerName: string;
    cpf: string;
    phoneNumber: string;
    email: string;
    reservation: {
      date: string;
      time: string;
      tableNumber: number;
    };
}
const ReservationCard: React.FC<{ reservation: Reservation }> = ({ reservation }) => {
  const { id, customerName, tableNumber, numChairs, date, time } = reservation;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4">
      <h2 className="text-xl font-semibold mb-2">Reserva ID: {id}</h2>
      <p>Cliente: {customerName}</p>
      <p>Mesa Número: {tableNumber}</p>
      <p>Número de Cadeiras: {numChairs}</p>
      <p>Data: {date}</p>
      <p>Hora: {time}</p>
    </div>
  );
};

export default ReservationCard;

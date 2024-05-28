// src/components/ReservationCard.tsx
import React from 'react';
import { Reservation } from '../../types/reservation';

const ReservationCard: React.FC<{ reservation: Reservation }> = ({ reservation }) => {
  const { id, customerName, cpf, phoneNumber, employeeId, reservationId, reservation: { date, time, tableNumber } } = reservation;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
      <h2 className="text-xl font-semibold mb-2">Reserva ID: {id}</h2>
      <p>Cliente: {customerName}</p>
      <p>CPF: {cpf}</p>
      <p>Número de Telefone: {phoneNumber}</p>
      <p>ID do Funcionário: {employeeId}</p>
      <p>ID da Reserva: {reservationId}</p>
      <p>Mesa Número: {tableNumber}</p>
      <p>Data: {date}</p>
      <p>Hora: {time}</p>
    </div>
  );
};

export default ReservationCard;

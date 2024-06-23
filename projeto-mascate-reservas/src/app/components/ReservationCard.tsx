import React, { useState } from 'react';
import Reservation from '../types/reservation';
import { checkInReservation, checkOutReservation, cancelReservation } from '../services/getReservationService';

interface ReservationCardProps {
  reservation: Reservation;
  onCheckout: (idReservation: number, checkoutTime: string) => void; // Callback para atualizar o estado após o checkout
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, onCheckout }) => {
  const { idReservation, customer, employee, reservationDate, time, table, checkin, checkout } = reservation;
  const [isCheckedIn, setIsCheckedIn] = useState(checkin);
  const [isCheckedOut, setIsCheckedOut] = useState(checkout);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const tableNumber = String(table?.tableID || '');

  const handleCheckIn = async () => {
    const currentTime = new Date().toLocaleTimeString();
    setCheckInTime(currentTime);
    setIsCheckedIn(true);
    await checkInReservation(idReservation);
    window.location.href = window.location.href;
  };

  const handleCheckOut = async () => {
    await checkOutReservation(idReservation, (id, time) => {
      setIsCheckedOut(true); // Atualiza isCheckedOut apenas após o sucesso do checkout
    });
    window.location.href = window.location.href;
  };

  const handleCancel = async () => {
    await cancelReservation(idReservation);
    window.location.href = window.location.href;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
      <h2 className="text-xl font-semibold mb-2">Reserva ID: {idReservation}</h2>
      <p>Cliente: {customer.customerName}</p>
      <p>CPF: {customer.cpf}</p>
      <p>Número de Telefone: {customer.phoneNumber}</p>
      <p>Funcionário: {employee.name}</p>
      <p>ID da Reserva: {idReservation}</p>
      <p>Mesa Número: {tableNumber}</p>
      <p>Data: {reservationDate}</p>
      <p>Hora: {time}</p>
      {checkInTime && <p>Check-in Time: {checkInTime}</p>}
      <div className='w-full flex gap-5 justify-between p-4'>
        {!isCheckedIn && (
          <button onClick={handleCheckIn} className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300'>
            Check In
          </button>
        )}
        {!isCheckedOut && isCheckedIn && (
          <button onClick={handleCheckOut} className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300'>
            Check Out
          </button>
        )}
        {(!isCheckedIn || !isCheckedOut) && (
          <button onClick={handleCancel} className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300'>
            Cancelar Reserva
          </button>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;

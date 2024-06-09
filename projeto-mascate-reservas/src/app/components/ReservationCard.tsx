// components/ReservationCard.tsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Reservation from '../types/reservation';
import { checkInReservation, checkOutReservation, cancelReservation } from '../services/getReservationService';

interface ReservationCardProps {
  reservation: Reservation;
  onCheckout: (idReservation: number, checkoutTime: string) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, onCheckout }) => {
  const { idReservation, name, cpf, phoneNumber, employeeId, reservationDate, time, tableId, checkin } = reservation;
  const [isCheckedIn, setIsCheckedIn] = useState(checkin);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const handleCheckIn = async () => {
    const currentTime = new Date().toLocaleTimeString();
    setCheckInTime(currentTime);
    setIsCheckedIn(true);
    await checkInReservation(idReservation);
    window.location.href = window.location.href; // Refresh the page
  };

  const handleCheckOut = async () => {
    await checkOutReservation(idReservation, onCheckout);
    window.location.href = window.location.href; // Refresh the page
  };

  const handleCancel = async () => {
    await cancelReservation(idReservation);
    window.location.href = window.location.href; // Refresh the page
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
      <h2 className="text-xl font-semibold mb-2">Reserva ID: {idReservation}</h2>
      <p>Cliente: {name}</p>
      <p>CPF: {cpf}</p>
      <p>Número de Telefone: {phoneNumber}</p>
      <p>Funcionário: {employeeId}</p>
      <p>ID da Reserva: {idReservation}</p>
      <p>Mesa Número: {tableId}</p>
      <p>Data: {reservationDate}</p>
      <p>Hora: {time}</p>
      {checkInTime && <p>Check-in Time: {checkInTime}</p>}
      <div className='w-full flex gap-5 justify-between p-4'>
        {!isCheckedIn ? (
          <button onClick={handleCheckIn} className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 mr-2'>Check In</button>
        ) : (
          <button onClick={handleCheckOut} className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 mr-2'>Check Out</button>
        )}
        <button onClick={handleCancel} className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 mr-2'>Cancelar Reserva</button>
      </div>
    </div>
  );
};

export default ReservationCard;

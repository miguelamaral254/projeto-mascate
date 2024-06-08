import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Reservation } from '../types/reservation';

interface ReservationCardProps {
  reservation: Reservation;
  onCheckout: (reservationId: number, checkoutTime: string) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, onCheckout }) => {
  const { idReservation, name, cpf, phoneNumber, employeeId, reservationDate, time, tableId, checkin } = reservation;
  const [isCheckedIn, setIsCheckedIn] = useState(checkin);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const handleCheckIn = async () => {
    const currentTime = new Date().toLocaleTimeString();
    setCheckInTime(currentTime);
    setIsCheckedIn(true);

    // Envia os dados de check-in para o backend
    await fetch('/api/checkin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reservationId: idReservation, checkInTime: currentTime }),
    });

    Swal.fire({
      title: 'Check-In Realizado',
      text: 'O check-in foi realizado com sucesso!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const handleCheckOut = async () => {
    const currentTime = new Date().toLocaleTimeString();
    onCheckout(idReservation, currentTime);

    // Envia os dados de check-out para o backend
    await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reservationId: idReservation, checkOutTime: currentTime }),
    });

    Swal.fire({
      title: 'Check-Out Realizado',
      text: 'O check-out foi realizado com sucesso!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const handleCancel = async () => {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você realmente deseja cancelar esta reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, cancelar!',
      cancelButtonText: 'Não, manter'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { value: motivo } = await Swal.fire({
          title: 'Motivo do cancelamento',
          input: 'radio',
          inputOptions: {
            'Cliente não comparece': 'Cliente não comparece',
            'Outro motivo': 'Outro motivo'
          },
          inputValidator: (value) => {
            if (!value) {
              return 'Você precisa escolher uma opção!';
            }
          },
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          showCancelButton: true,
          confirmButtonText: 'Enviar',
          cancelButtonText: 'Cancelar'
        });

        if (motivo) {
          let especificarMotivo = motivo;
          if (motivo === 'Outro motivo') {
            const { value: outroMotivo } = await Swal.fire({
              title: 'Especifique o motivo',
              input: 'text',
              inputPlaceholder: 'Digite o motivo do cancelamento',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Enviar',
              cancelButtonText: 'Cancelar'
            });
            if (outroMotivo) {
              especificarMotivo = outroMotivo;
            }
          }
          // Envia os dados de cancelamento para o backend
          await fetch('/api/cancel', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reservationId: idReservation, motivo: especificarMotivo }),
          });

          console.log(`Reserva ${idReservation} cancelada. Motivo: ${especificarMotivo}`);
        }
      }
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
      <h2 className="text-xl font-semibold mb-2">Reserva ID: {idReservation}</h2>
      <p>Cliente: {name}</p>
      <p>CPF: {cpf.cpf}</p>
      <p>Número de Telefone: {phoneNumber}</p>
      <p>Funcionário: {employeeId.name}</p>
      <p>ID da Reserva: {idReservation}</p>
      <p>Mesa Número: {tableId.tableID}</p>
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

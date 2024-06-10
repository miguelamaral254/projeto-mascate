"use client"
import React, { useEffect, useState } from 'react';

import Reservation from '../types/reservation';
import { checkInReservation, checkOutReservation, cancelReservation } from '../services/getReservationService';
import { getEmployees } from '../services/getEmployeeService';

interface ReservationCardProps {
  reservation: Reservation;
  onCheckout: (idReservation: number, checkoutTime: string) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, onCheckout }) => {
  const { idReservation, customer, employee, reservationDate, time, table, checkin } = reservation;
  const [isCheckedIn, setIsCheckedIn] = useState(checkin);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [employeeName, setEmployeeName] = useState<string | null>(null);

  useEffect(() => {
    const getEmployee = async () => {
      try {
        if (employee) { // Verificar se employee está definido
          const employees = await getEmployees();
          const foundEmployee = employees.find(emp => emp.employeeId === employee.employeeId);
          if (foundEmployee) {
            setEmployeeName(foundEmployee.name);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      }
    };
    getEmployee();
  }, [employee]);

  const handleCheckIn = async () => {
    const currentTime = new Date().toLocaleTimeString();
    setCheckInTime(currentTime);
    setIsCheckedIn(true);
    await checkInReservation(idReservation);
    window.location.href = window.location.href;
  };

  const handleCheckOut = async () => {
    await checkOutReservation(idReservation, onCheckout);
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
      <p>Número de Telefone: {}</p>
      <p>Funcionário: {employeeName}</p>
      <p>ID da Reserva: {idReservation}</p>
      <p>Mesa Número: {table.tableId}</p>
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

"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CalendarComponent from './CalendarComponent';
import TableLayout from './TableLayout';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FormData {
  date: Date;
  time: string;
}

const ReservationForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Aqui você pode fazer uma requisição para o backend para salvar a reserva
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
      <CalendarComponent onDateChange={(date) => {
        setValue('date', date);
        setSelectedDate(date);
      }} />
      <div>
        <label className="block text-gray-700">Horário:</label>
        <select {...register('time')} className="mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md p-2" onChange={(e) => setSelectedTime(e.target.value)}>
          {['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      {selectedTime && <TableLayout date={selectedDate} time={selectedTime} />}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
        Reservar
      </button>
    </form>
  );
};

export default ReservationForm;

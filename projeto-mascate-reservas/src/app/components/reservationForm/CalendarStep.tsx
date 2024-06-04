"use client"
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormData } from '../../../types/formData';
import CalendarComponent from '../CalendarComponent';
import NavBtn from '../NavBtn';
import Image from 'next/image';

import logo from "@/../../public/images/Logo.png"

interface CalendarStepProps {
  register: UseFormRegister<FormData>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleTimeSelect: (time: string) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedTime: string;
}

const CalendarStep: React.FC<CalendarStepProps> = ({
  register,
  handleNextStep,
  handlePreviousStep,
  handleTimeSelect,
  selectedDate,
  setSelectedDate,
  selectedTime
}) => {
  return (
    <div className='flex flex-col items-center w-full'>
      <Image src={logo} alt="logo" className="w-30 h-30 p-5"/>
    <h2 className="text-xl font-semibold mb-4 text-yellow-300/80">Selecione a Data e Hora</h2>
    <CalendarComponent
      onDateChange={(date) => setSelectedDate(date)}
    />
    <div className="mb-4">
      <label className="block text-yellow-300/80">Horário:</label>
      <select {...register('time', { required: true })} className="input-field flex text-center justify-center items-center bg-gray-100  rounded-sm p-1" onChange={(e) => handleTimeSelect(e.target.value)}>
        <option value="">Selecione um horário</option>
        {['12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00'].map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
      <div className="flex w-full justify-between">
        <NavBtn onClick={handlePreviousStep} text='back'/>
        <NavBtn onClick={handleNextStep} text='next' disabled={!selectedTime}/>
      </div>
    </div>
  );
};

export default CalendarStep;

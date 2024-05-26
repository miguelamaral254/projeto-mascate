"use client";
import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  onDateChange: (date: Date) => void;
}

const CalendarComponent: React.FC<Props> = ({ onDateChange }) => {
  const [date, setDate] = useState<Date | null>(new Date());

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setDate(value);
      onDateChange(value);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Calendar
        onChange={handleDateChange}
        value={date}
        locale="pt-BR"
        formatDay={(locale, date) => format(date, 'd', { locale: ptBR })}
      />
    </div>
  );
};

export default CalendarComponent;

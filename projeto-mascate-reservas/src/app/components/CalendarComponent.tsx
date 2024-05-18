"use client";
import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default CalendarComponent;

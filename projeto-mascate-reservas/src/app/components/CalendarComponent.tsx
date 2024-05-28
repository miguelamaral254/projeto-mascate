import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TableAvailability } from '../../types/table';

interface Props {
  onDateChange: (date: Date) => void;
}

// Importe a disponibilidade da tabela
import tableAvailability from '../data/tableAvailability';

const CalendarComponent: React.FC<Props> = ({ onDateChange }) => {
  const [date, setDate] = useState<Date | null>(new Date());

  const isDateTimeAvailable = (date: Date, time: string): boolean => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const availableTimes = tableAvailability[formattedDate];

    // Verifica se a data está disponível no objeto tableAvailability
    if (!availableTimes) {
      return false;
    }

    return availableTimes[time] !== undefined;
  };

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
        className="w-full"
        // Forneça a disponibilidade da tabela para o componente Calendar
        tileDisabled={({ date }) => {
          const formattedDate = format(date, 'yyyy-MM-dd');
          return !tableAvailability[formattedDate];
        }}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            const formattedDate = format(date, 'yyyy-MM-dd');
            return tableAvailability[formattedDate] ? 'available' : 'unavailable';
          }
          return '';
        }}
        tileContent={({ date, view }) => {
          if (view === 'month') {
            const formattedDate = format(date, 'yyyy-MM-dd');
            const availableTimes = tableAvailability[formattedDate];
            if (availableTimes) {
              return <div>{Object.keys(availableTimes).length} horários disponíveis</div>;
            }
          }
          return null;
        }}
      />
    </div>
  );
};

export default CalendarComponent;

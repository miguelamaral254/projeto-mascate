import logo from "@/../../public/images/Logo.png";
import React, { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import CalendarComponent from "../CalendarComponent";
import Image from "next/image";
import Btn from "../Btn";
import { format } from "date-fns";
import { FormData } from "@/app/types/formData";
import { Table } from "@/app/types/table"; 
import { getTables } from "../../services/getTableService"; 

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
  selectedTime,
}) => {
  const [availableTimes, setAvailableTimes] = useState<string[]>(["12:00", "13:00", "14:00", "15:00"]);
  const [availableTables, setAvailableTables] = useState<Table[]>([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const tables = await getTables();
        setAvailableTables(tables);
      } catch (error) {
        console.error('Erro ao buscar mesas:', error);
        // Trate o erro conforme necessário
      }
    };

    fetchTables();
  }, []);

  useEffect(() => {
    // Filtrar mesas disponíveis com base no size e availability
    const filteredTables = availableTables.filter(table => table.availability && table.size === 'small');
    // Pode ajustar o filtro para atender às necessidades específicas
    console.log(filteredTables);
  }, [availableTables]);

  return (
    <div className="flex flex-col items-center w-full">
      <Image src={logo} alt="logo" className="w-30 h-30 p-5" />
      <h2 className="text-xl font-semibold mb-4 text-yellow-300/80">
        Selecione a Data e Hora
      </h2>
      <CalendarComponent onDateChange={setSelectedDate} />
      <div className="mb-4">
        <label className="block text-yellow-300/80">Horário:</label>
        <select
          {...register("time", { required: true })}
          className="input-field flex text-center justify-center items-center bg-primary text-secondary rounded-sm p-1"
          onChange={(e) => handleTimeSelect(e.target.value)}
        >
          <option value="">Selecione um horário</option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full justify-between">
        <Btn onClick={handlePreviousStep} text="back" />
        <Btn onClick={handleNextStep} text="next" disabled={!selectedTime} />
      </div>
    </div>
  );
};

export default CalendarStep;

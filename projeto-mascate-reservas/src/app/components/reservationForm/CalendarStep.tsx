import React, { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "../../types/formData";
import CalendarComponent from "../CalendarComponent";
import Image from "next/image";
import logo from "@/../../public/images/Logo.png";
import Btn from "../Btn";
import { format } from "date-fns";
import fetchAvailableTimes from "../../functions/fetchAvailableTImes";


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
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    const fetchTimes = async () => {
      if (selectedDate) {
        const dateString = format(selectedDate, "yyyy-MM-dd");
        const times = await fetchAvailableTimes(dateString);
        setAvailableTimes(times);
      }
    };

    fetchTimes();
  }, [selectedDate]);

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

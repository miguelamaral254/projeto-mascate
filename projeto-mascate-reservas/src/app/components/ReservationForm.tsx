import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CalendarComponent from './CalendarComponent';
import TableLayout from './TableLayout';
import ConfirmationStep from './ConfirmationStep';

interface FormData {
  name: string;
  cpf: string;
  phoneNumber: string;
  date: Date;
  time: string;
  table: { type: string; number: number } | null;
}

const ReservationForm: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Aqui você pode fazer uma requisição para o backend para salvar a reserva
    setCurrentStep(4); // Avançar para a etapa de confirmação
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleTableSelect = (table: { type: string; number: number }) => {
    setValue('table', table);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      {currentStep === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Informações do Cliente</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Nome:</label>
            <input {...register('name')} type="text" className="input-field" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CPF:</label>
            <input {...register('cpf')} type="text" className="input-field" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Número de Telefone:</label>
            <input {...register('phoneNumber')} type="text" className="input-field" />
          </div>
          <button type="button" onClick={handleNextStep} className="btn-primary">
            Próximo
          </button>
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Seleção de Data e Hora</h2>
          <CalendarComponent onDateChange={(date) => {
            setValue('date', date);
            setSelectedDate(date);
          }} />
          <div className="mb-4">
            <label className="block text-gray-700">Horário:</label>
            <select {...register('time')} className="input-field" onChange={(e) => handleTimeSelect(e.target.value)}>
              <option value="">Selecione um horário</option>
              {['12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00'].map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          {selectedTime && (
            <TableLayout
              date={selectedDate}
              time={selectedTime}
              onTableSelect={handleTableSelect}
            />
          )}
          <button type="button" onClick={handlePreviousStep} className="btn-secondary mr-2">
            Anterior
          </button>
          <button type="button" onClick={handleNextStep} className="btn-primary">
            Próximo
          </button>
        </div>
      )}
      {currentStep === 3 && (
        <ConfirmationStep
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onPreviousStep={handlePreviousStep}
          onSubmit={handleSubmit(onSubmit)}
          selectedTable={null}
        />
      )}
    </form>
  );
};

export default ReservationForm;

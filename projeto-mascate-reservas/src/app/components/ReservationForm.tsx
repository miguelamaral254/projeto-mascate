import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CalendarComponent from './CalendarComponent';
import TableLayout from './TableLayout';
import ConfirmationStep from './ConfirmationStep';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import InputMask from 'react-input-mask';

interface FormData {
  name: string;
  cpf: string;
  phoneNumber: string;
  date: Date;
  time: string;
  table: { type: string; number: number; numChairs: number } | null;
  employeeId: string;
  reservationId: string;
}

const ReservationForm: React.FC = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<{ type: string; number: number; numChairs: number } | null>(null);

  const onSubmit = async (data: FormData) => {
    const reservationId = uuidv4(); // Gera um ID único para a reserva
    data.reservationId = reservationId;
    console.log(data);
    Swal.fire({
      title: 'Reserva Realizada',
      text: `Reserva para a mesa ${selectedTable?.number} com ${selectedTable?.numChairs} cadeiras no dia ${selectedDate?.toISOString().split('T')[0]} às ${selectedTime} foi realizada com sucesso. ID da reserva: ${reservationId}`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
    setCurrentStep(4);
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

  const handleTableSelect = (table: { type: string; number: number; numChairs: number }) => {
    setValue('table', table);
    setSelectedTable(table);
  };

  const customerName = watch('name');
  const employeeId = watch('employeeId');

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
            <InputMask
              {...register('cpf')}
              mask="999.999.999-99"
              className="input-field"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Número de Telefone:</label>
            <InputMask
              {...register('phoneNumber')}
              mask="(99) 9 9999-9999"
              className="input-field"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">ID do Funcionário:</label>
            <input {...register('employeeId')} type="text" className="input-field" />
          </div>
          <div className="mt-4 flex justify-between">
            <button>
              Cancelar
            </button>
            <button type="button" onClick={handleNextStep} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
              Próximo
            </button>
          </div>
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
              selectedTable={selectedTable}
            />
          )}
          <div className="mt-4 flex justify-between">
            <button type="button" onClick={handlePreviousStep} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">
              Anterior
            </button>
            <button type="button" onClick={handleNextStep} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
              Próximo
            </button>
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <ConfirmationStep
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedTable={selectedTable}
          onPreviousStep={handlePreviousStep}
          onSubmit={handleSubmit(onSubmit)}
          customerName={customerName}
          employeeId={employeeId}
        />
      )}
    </form>
  );
};

export default ReservationForm;

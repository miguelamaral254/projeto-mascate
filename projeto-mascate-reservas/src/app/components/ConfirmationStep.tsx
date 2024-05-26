import React from 'react';
import { useForm } from 'react-hook-form';

interface ConfirmationStepProps {
  selectedDate: Date;
  selectedTime: string;
  selectedTable: { type: string, number: number } | null;
  onPreviousStep: () => void;
  onSubmit: () => void;
}

interface FormData {
  employeeId: string;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ selectedDate, selectedTime, selectedTable, onPreviousStep, onSubmit }) => {
  const { register, handleSubmit } = useForm<FormData>();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Confirmação da Reserva</h2>
      <p>Data da Reserva: {selectedDate.toISOString().split('T')[0]}</p>
      <p>Horário da Reserva: {selectedTime}</p>
      {selectedTable && (
        <p>
          Mesa Número: {selectedTable.number} ({selectedTable.type.replace('_', ' ')})
        </p>
      )}
      <div className="mt-4">
        <label className="block text-gray-700">Número de Identificação do Funcionário:</label>
        <input {...register('employeeId')} type="text" className="input-field" />
      </div>
      <div className="mt-4 flex justify-between">
        <button type="button" onClick={onPreviousStep} className="button-secondary">
          Anterior
        </button>
        <button type="submit" onClick={handleSubmit(onSubmit)} className="button-primary">
          Realizar Reserva
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;

import React from 'react';
import { useForm } from 'react-hook-form';

interface ConfirmationStepProps {
  selectedDate: Date;
  selectedTime: string;
  selectedTable: { type: string; number: number; numChairs: number } | null;
  onPreviousStep: () => void;
  onSubmit: () => void;
  customerName: string;  
  employeeId: string;  
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  selectedDate,
  selectedTime,
  selectedTable,
  onPreviousStep,
  onSubmit,
  customerName,
  employeeId
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Confirmação da Reserva</h2>
      <p>Data da Reserva: {selectedDate.toISOString().split('T')[0]}</p>
      <p>Horário da Reserva: {selectedTime}</p>
      {selectedTable && (
        <p>
          Nome do cliente: {customerName}
          <br />
          Mesa Número: {selectedTable.number} ({selectedTable.type.replace('_', ' ')})
          <br />
          Número de Cadeiras: {selectedTable.numChairs}
          <br />
          ID do funcionário: {employeeId}
        </p>
      )}
      <div className="mt-4 flex justify-between">
        <button type="button" onClick={onPreviousStep} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">
          Anterior
        </button>
        <button type="submit" onClick={onSubmit} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
          Realizar Reserva
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;

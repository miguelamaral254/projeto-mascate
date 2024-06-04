import React from 'react';
import { ConfirmationStepProps } from '@/types/ConfirmationStepProps';


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
    <div>
      <h2 className="text-xl font-semibold mb-4">Confirmação</h2>
      <p>Data: {selectedDate.toISOString().split('T')[0]}</p>
      <p>Hora: {selectedTime}</p>
      <p>Mesa: {selectedTable?.number} ({selectedTable?.numChairs} cadeiras)</p>
      <p>Nome do Cliente: {customerName}</p>
      <p>ID do Funcionário: {employeeId}</p>
      <div className="flex justify-between mt-4">
        <button 
          type="button" 
          onClick={onPreviousStep} 
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Anterior
        </button>
        <button 
          type="button" 
          onClick={onSubmit} 
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
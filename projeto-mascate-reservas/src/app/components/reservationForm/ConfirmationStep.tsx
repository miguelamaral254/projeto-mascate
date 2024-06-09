"use client"
import React from 'react';
import { ConfirmationStepProps } from '@/app/types/ConfirmationStepProps';
import Btn from '../Btn';


const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  selectedDate,
  selectedTime,
  selectedTable,
  onPreviousStep,
  onSubmit,
  name,
  employeeId
}) => {
  return (
    <div className='text-primary '>
      <h2 className="text-xl font-semibold mb-4">Confirmação</h2>
      <p>Data: {selectedDate.toISOString().split('T')[0]}</p>
      <p>Hora: {selectedTime}</p>
      <p>Mesa: {selectedTable?.tableId} ({selectedTable?.chairs} cadeiras)</p>
      <p>Nome do Cliente: {name}</p>
      <p>ID do Funcionário: {employeeId}</p>
      <div className="flex justify-between mt-4">
        <Btn text='back' onClick={onPreviousStep}/>
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

"use client"
import React from 'react';
import TableLayout from '../TableLayout';
import { Table } from '../../types/table';
import Btn from '../Btn';

interface TableStepProps {
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleTableSelect: (table: Table) => void;
  selectedDate: Date;
  selectedTime: string;
  selectedTable: Table | null;
  tableSize: string;
}

const TableStep: React.FC<TableStepProps> = ({
  handleNextStep,
  handlePreviousStep,
  handleTableSelect,
  selectedDate,
  selectedTime,
  selectedTable,
  tableSize,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-primary">Selecione a Mesa</h2>
      <TableLayout
        date={selectedDate}
        time={selectedTime}
        onTableSelect={handleTableSelect}
        tableSize={tableSize}
      />
      <div className="mt-4 flex justify-between">
        <Btn onClick={handlePreviousStep} text='Voltar' />
        <Btn onClick={handleNextStep} text='Próximo' disabled={!selectedTable} />
      </div>
    </div>
  );
};

export default TableStep;

import React from 'react';
import TableLayout from '../TableLayout';
import { Table } from '../../../types/table';
import NavBtn from '../NavBtn';

interface TableSizeProps {
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleTableSelect: (table: Table) => void;
  selectedDate: Date;
  selectedTime: string;
  selectedTable: Table | null;
  tableSize: string;
}

const TableStep: React.FC<TableSizeProps> = ({
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
      <h2 className="text-xl font-semibold mb-4">Selecione a Mesa</h2>
      <TableLayout
        date={selectedDate}
        time={selectedTime}
        onTableSelect={handleTableSelect}
        selectedTable={selectedTable}
        tableSize={tableSize}
      />
      <div className="mt-4 flex justify-between">
        <NavBtn onClick={handlePreviousStep} text='back'/>
        <NavBtn onClick={handleNextStep} text='next' disabled={!selectedTable}/>
       
      </div>
    </div>
  );
};

export default TableStep;

import React from 'react';
import TableLayout from '../TableLayout';

interface TableSelectionStepProps {
  date: Date;
  time: string;
  onTableSelect: (tableType: string, tableNumber: number) => void;
  onNextStep: () => void;
}

const TableSelectionStep: React.FC<TableSelectionStepProps> = ({ date, time, onTableSelect, onNextStep }) => {
  return (
    <div>
      <h2>Selecione a Mesa</h2>
      <TableLayout date={date} time={time} onTableSelect={onTableSelect} />
      <button onClick={onNextStep}>Próximo</button>
    </div>
  );
};

export default TableSelectionStep;

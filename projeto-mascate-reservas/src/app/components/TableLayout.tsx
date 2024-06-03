import React, { useState } from 'react';
import TableModal from './TableModal';
import tableAvailability from '../data/tableAvailability';
import { Table } from '../../types/table';

interface TableLayoutProps {
  date: Date;
  time: string;
  onTableSelect: (table: Table) => void;
  selectedTable: Table | null;
  tableSize: string; // Adicionando a propriedade tableSize à interface
}

const TableLayout: React.FC<TableLayoutProps> = ({ date, time, onTableSelect, tableSize }) => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const formattedDate = date.toISOString().split('T')[0];
  const tables = tableAvailability[formattedDate]?.[time as keyof typeof tableAvailability[typeof formattedDate]];

  const handleTableClick = (type: string, number: number, size: string, numChairs: number) => {
    setSelectedTable({ type, number, size, numChairs });
  };

  const handleSelectTable = (numChairs: number) => {
    if (selectedTable) {
      onTableSelect({ ...selectedTable, numChairs });
    }
  };

  if (!tables) {
    return <div className="text-red-500">Não há mesas disponíveis para esta data e horário.</div>;
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(tables).map(([size, numbers]) => {
          // Verifica se o tamanho da mesa atual é igual ao tamanho selecionado
          if (size !== tableSize) {
            return null; // Retorna null se o tamanho não corresponder ao tamanho selecionado
          }

          // Se o tamanho da mesa corresponder ao tamanho selecionado, renderiza as mesas desse tamanho
          return numbers.map((number: number) => (
            <div
              key={`${size}-${number}`}
              className="p-4 rounded-lg cursor-pointer transition duration-300 bg-green-200 hover:bg-green-300"
              onClick={() => handleTableClick(size, number, size, selectedTable ? selectedTable.numChairs : 0)}
            >
              Mesa {number} (Tamanho: {size}) 
            </div>
          ));
        })}
      </div>
      {selectedTable && (
        <TableModal
          table={selectedTable}
          onClose={() => setSelectedTable(null)}
          onSelect={handleSelectTable}
        />
      )}
    </div>
  );
};

export default TableLayout;

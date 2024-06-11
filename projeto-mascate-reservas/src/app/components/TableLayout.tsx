import React, { useState } from 'react';
import TableModal from './TableModal';
import tableAvailability from '../data/tableAvailability';
import { Table } from '../types/table';
import { TableLayoutProps } from '@/app/types/TableLayoutProps';

const TableLayout: React.FC<TableLayoutProps> = ({ date, time, onTableSelect, tableSize }) => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const formattedDate = date.toISOString().split('T')[0];
  const tables = tableAvailability[formattedDate]?.[time as keyof typeof tableAvailability[typeof formattedDate]];

  const handleTableClick = (tableID: number, number: number, size: string) => {
    setSelectedTable({ type: size, tableID, size, chairs: size === 'G' ? 6 : size === 'M' ? 4 : 2 });
  };

  const handleSelectTable = (numChairs: number) => {
    if (selectedTable) {
      onTableSelect({ ...selectedTable, chairs: numChairs });
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
          return numbers.map(({ tableId, number }: { tableId: number; number: number }) => (
            <div
              key={`${size}-${number}`}
              className="p-4 rounded-lg cursor-pointer transition duration-300 bg-green-200 hover:bg-green-300"
              onClick={() => handleTableClick(tableId, number, size)}
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

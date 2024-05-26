import React, { useState } from 'react';
import TableModal from './TableModal';

interface TableLayoutProps {
  date: Date;
  time: string;
  onTableSelect: (table: { type: string; number: number; numChairs: number }) => void; // Alterado para incluir numChairs
  selectedTable: { type: string; number: number; } | null;
}

type TableAvailability = {
  [key: string]: {
    [key: string]: {
      "G": number[];
      "M": number[];
      "P": number[];
    };
  };
};

const availability: TableAvailability = {
  "2024-05-26": {
    "12:00": {
      "G": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "M": [1, 2, 3, 4, 5, 6],
      "P": [1, 2, 3, 4]
    },
    "13:00": {
      "G": [1, 3, 4, 5, 6, 7, 8, 9],
      "M": [1, 3, 4, 5, 6],
      "P": [1, 2, 3]
    }
  }
};

const TableLayout: React.FC<TableLayoutProps> = ({ date, time, onTableSelect }) => {
  const [selectedTable, setSelectedTable] = useState<{ type: string; number: number; size: string; numChairs: number } | null>(null);

  const formattedDate = date.toISOString().split('T')[0];
  const tables = availability[formattedDate]?.[time as keyof typeof availability[typeof formattedDate]];

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
        {Object.entries(tables).map(([size, numbers]) => (
          numbers.map((number: number) => (
            <div
              key={`${size}-${number}`}
              className={`p-4 rounded-lg cursor-pointer transition duration-300 bg-green-200 hover:bg-green-300`}
              onClick={() => handleTableClick(size, number, size, selectedTable ? selectedTable.numChairs : 0)}
            >
              Mesa {number} (Tamanho: {size}) 
            </div>
          ))
        ))}
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

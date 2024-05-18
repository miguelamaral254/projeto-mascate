// /components/TableLayout.tsx
import React, { useState } from 'react';
import TableModal from './TableModal';

interface TableLayoutProps {
  date: Date;
  time: string;
}

type TableAvailability = {
  [key: string]: { // Date as a key, e.g., "2024-05-18"
    [key: string]: { // Time as a key, e.g., "12:00"
      "6_cadeiras": number[];
      "4_cadeiras": number[];
      "2_cadeiras": number[];
    };
  };
};

const availability: TableAvailability = {
  "2024-05-18": {
    "12:00": {
      "6_cadeiras": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      "4_cadeiras": [1, 2, 3, 4, 5, 6],
      "2_cadeiras": [1, 2, 3, 4]
    },
    "13:00": {
      "6_cadeiras": [1, 3, 4, 5, 6, 7, 8, 9],
      "4_cadeiras": [1, 3, 4, 5, 6],
      "2_cadeiras": [1, 2, 3]
    }
  }
};

const TableLayout: React.FC<TableLayoutProps> = ({ date, time }) => {
  const [selectedTable, setSelectedTable] = useState<{ type: string, number: number } | null>(null);
  const formattedDate = date.toISOString().split('T')[0];

  // Asserting the type of tables
  const tables = availability[formattedDate as keyof typeof availability]?.[time as keyof typeof availability[typeof formattedDate]];

  const handleTableClick = (type: string, number: number) => {
    setSelectedTable({ type, number });
  };

  if (!tables) {
    return <div className="text-red-500">Não há mesas disponíveis para esta data e horário.</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {Object.entries(tables).map(([type, numbers]) =>
        numbers.map((number: number) => (
          <div
            key={`${type}-${number}`}
            className="p-4 bg-green-200 rounded-lg cursor-pointer hover:bg-green-300"
            onClick={() => handleTableClick(type, number)}
          >
            Mesa {number} ({type.replace('_', ' ')})
          </div>
        ))
      )}
      {selectedTable && (
        <TableModal
          table={selectedTable}
          onClose={() => setSelectedTable(null)}
        />
      )}
    </div>
  );
};

export default TableLayout;

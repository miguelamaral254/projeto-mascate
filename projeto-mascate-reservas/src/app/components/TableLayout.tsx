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
  "2024-05-20": {
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
  const [confirmedTable, setConfirmedTable] = useState<{ type: string, number: number } | null>(null);
  const formattedDate = date.toISOString().split('T')[0];

  // Asserting the type of tables
  const tables = availability[formattedDate]?.[time as keyof typeof availability[typeof formattedDate]];


  const handleTableClick = (type: string, number: number) => {
    setSelectedTable({ type, number });
  };

  const handleSelectTable = () => {
    if (selectedTable) {
      setConfirmedTable(selectedTable);
      setSelectedTable(null); // Close the modal
    }
  };

  const handleReserve = () => {
    if (confirmedTable) {
      alert(`Mesa ${confirmedTable.number} (${confirmedTable.type.replace('_', ' ')}) reservada para ${formattedDate} às ${time}`);
      // Aqui você pode adicionar a lógica para enviar a reserva para o servidor
    } else {
      alert("Nenhuma mesa selecionada");
    }
  };

  if (!tables) {
    return <div className="text-red-500">Não há mesas disponíveis para esta data e horário.</div>;
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(tables).map(([type, numbers]) =>
          numbers.map((number: number) => (
            <div
              key={`${type}-${number}`}
              className={`p-4 rounded-lg cursor-pointer transition duration-300 ${
                confirmedTable?.number === number && confirmedTable?.type === type ? 'bg-blue-300' : 'bg-green-200 hover:bg-green-300'
              }`}
              onClick={() => handleTableClick(type, number)}
            >
              Mesa {number} ({type.replace('_', ' ')})
            </div>
          ))
        )}
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

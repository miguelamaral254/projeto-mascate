import React, { useState, useEffect } from 'react';
import TableModal from './TableModal';
import { getTables } from '../services/getTableService'; // Importe sua função getTables
import { Table } from '../types/table';
import { TableLayoutProps } from '@/app/types/TableLayoutProps';

const TableLayout: React.FC<TableLayoutProps> = ({ date, time, onTableSelect, tableSize }) => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTables = async () => {
      setLoading(true);
      try {
        const fetchedTables = await getTables(); // Busca as mesas da API
        setTables(fetchedTables);
      } catch (error) {
        console.error('Erro ao buscar mesas:', error);
      }
      setLoading(false);
    };

    fetchTables();
  }, []);

  const handleTableClick = (tableID: number, number: number, size: string) => {
    setSelectedTable({ type: size, tableID, size, chairs: size === 'G' ? 6 : size === 'M' ? 4 : 2 });
  };

  const handleSelectTable = (numChairs: number) => {
    if (selectedTable) {
      onTableSelect({ ...selectedTable, chairs: numChairs });
    }
  };

  if (loading) {
    return <div className="text-blue-500">Carregando mesas...</div>;
  }

  if (!tables || tables.length === 0) {
    return <div className="text-red-500">Não há mesas disponíveis.</div>;
  }

  // Filtra as mesas disponíveis para a data e hora selecionadas e pelo tamanho desejado
  const filteredTables = tables.filter(table => {
    // Lógica para verificar se a mesa está disponível para a data e hora selecionadas
    // Substitua esta lógica de exemplo pela lógica específica do seu aplicativo
    return <table className="availability"></table> && table.size === tableSize;
  });

  if (filteredTables.length === 0) {
    return <div className="text-red-500">Não há mesas disponíveis para esta data, horário e tamanho.</div>;
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-3 gap-4">
        {filteredTables.map(({ tableID, type }: Table) => (
          <div
            key={`${type}-${tableID}`}
            className="p-4 rounded-lg cursor-pointer transition duration-300 bg-green-200 hover:bg-green-300"
            onClick={() => handleTableClick(tableID, tableID, type)}
          >
            Mesa {tableID} (Tamanho: {type})
          </div>
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

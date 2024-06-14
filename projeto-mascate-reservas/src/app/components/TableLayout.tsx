import React, { useState, useEffect } from 'react';
import TableModal from './TableModal';
import { getTables } from '../services/getTableService';
import { fetchReservations } from '../services/getReservationService';
import { Table, TableLayoutProps } from '../types/table';
import Reservation from '../types/reservation';

const TableLayout: React.FC<TableLayoutProps> = ({ date, time, onTableSelect, tableSize }) => {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedTables = await getTables();
        setTables(fetchedTables);

        const fetchedReservations = await fetchReservations();
        setReservations(fetchedReservations);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Função para verificar se a mesa está livre para um determinado horário
  const isTableFree = (tableID: number, checkTime: string): boolean => {
    const reservedTable = reservations.find(reservation => reservation.table.tableID === tableID && reservation.time === checkTime);
    return !reservedTable;
  };
  const handleTableClick = (tableID: number, number: number, size: string) => {
    setSelectedTable({ tableID, size, chairs: size === 'G' ? 6 : size === 'M' ? 4 : 2, availability: true });
  };

  const handleSelectTable = async (numChairs: number) => {
    if (selectedTable) {
      try {
        await registerReservation(selectedTable.tableID, time);
        onTableSelect({ ...selectedTable, chairs: numChairs });
      } catch (error) {
        console.error('Erro ao registrar reserva:', error);
      }
    }
  };

  // Filtra as mesas disponíveis para a data, horário e tamanho desejados
  const filteredTables = tables.filter(table => {
    if (table.size !== tableSize) {
      return false;
    }

    // Verifica se a mesa está disponível para todos os horários desejados
    const isTableAvailable = isTableFree(table.tableID, time);
    const isTableAvailableLater = isTableFree(table.tableID, '13:00');
    const isTableAvailableLater2 = isTableFree(table.tableID, '14:00');
    const isTableAvailableLater3 = isTableFree(table.tableID, '15:00');

    return isTableAvailable && isTableAvailableLater && isTableAvailableLater2 && isTableAvailableLater3;
  });

  const registerReservation = async (tableID: number, reservationTime: string) => {
    try {
      // Simular registro de reserva, substitua com lógica real
      console.log(`Reserva registrada para mesa ${tableID} às ${reservationTime}`);
    } catch (error) {
      throw new Error('Erro ao registrar reserva');
    }
  };

  if (loading) {
    return <div className="text-blue-500">Carregando mesas...</div>;
  }

  if (!tables || tables.length === 0) {
    return <div className="text-red-500">Não há mesas disponíveis.</div>;
  }

  if (filteredTables.length === 0) {
    return <div className="text-red-500">Não há mesas disponíveis para esta data, horário e tamanho.</div>;
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-3 gap-4">
        {filteredTables.map(({ tableID, size }: Table) => (
          <div
            key={`${size}-${tableID}`}
            className="p-4 rounded-lg cursor-pointer transition duration-300 bg-green-200 hover:bg-green-300"
            onClick={() => handleTableClick(tableID, tableID, size)}
          >
            Mesa {tableID} (Tamanho: {size})
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



"use client"
import React, { useState, useEffect } from 'react';
import { Table } from '../types/table';
import { getTables } from '../services/getTableService';

const TableComponent: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const fetchedTables = await getTables();
        setTables(fetchedTables);
      } catch (error) {
        console.error('Erro ao buscar mesas:', error);
      }
    };

    fetchTables();
  }, []);

  const getAvailabilityColor = (availability: boolean) => {
    return availability ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg m-4">
      <h2 className="text-2xl font-bold mb-4">Mesas</h2>
      <ul>
        {tables.map((table, index) => (
          <li key={index} className="mb-2 p-4 border rounded-lg">
            <p className="text-gray-800"><strong className="text-gray-600">Id da mesa:</strong> {table.tableID}</p>
            <p className="text-gray-800"><strong className="text-gray-600">Tamanho:</strong> {table.size}</p>
            <p className="text-gray-800"><strong className="text-gray-600">Assentos:</strong> {table.chairs}</p>
            <p className="text-gray-800"><strong className="text-gray-600">Disponibilidade:</strong> 
              <span className={`font-bold ${getAvailabilityColor(table.availability)}`}>
                {table.availability ? 'Disponível' : 'Indisponível'}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableComponent;

"use client"
import React, { useState, useEffect } from 'react';
import { TableDTO } from '../types/ctable';
import { getTables } from '../services/getTableService';

const TableComponent: React.FC = () => {
  const [tables, setTables] = useState<TableDTO[]>([]);

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

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg m-4">
      <h2 className="text-2xl font-bold mb-4">Mesas</h2>
      <ul>
        {tables.map((table, index) => (
          <li key={index} className="mb-2 p-4 border rounded-lg">
            <p><strong>Id da mesa:</strong> {table.tableID}</p>
            <p><strong>Tamanho:</strong> {table.size}</p>
            <p><strong>Assentos:</strong> {table.chairs}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableComponent;

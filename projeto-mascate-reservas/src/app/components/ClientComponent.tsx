"use client"
import React, { useState, useEffect } from 'react';
import { ClientDTO } from '../types/client';
import { getClients } from '../services/getClientService';

const ClientComponent: React.FC = () => {
  const [clients, setClients] = useState<ClientDTO[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const fetchedClients = await getClients();
        setClients(fetchedClients);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg m-4">
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>
      <ul>
        {clients.map((client, index) => (
          <li key={index} className="mb-2 p-4 border rounded-lg">
            <p><strong>Nome:</strong> {client.name}</p>
            <p><strong>CPF:</strong> {client.cpf}</p>
            <p><strong>Telefone:</strong> {client.phoneNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientComponent;

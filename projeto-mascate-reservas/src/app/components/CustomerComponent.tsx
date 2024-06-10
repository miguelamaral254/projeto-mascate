"use client"
import React, { useState, useEffect } from 'react';
import { Customer } from '../types/customer';
import { getCustomer } from '../services/getCustomerService';

const CustomerComponent: React.FC = () => {
  const [Customer, setCustomer] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const fetchedCustomer = await getCustomer();
        setCustomer(fetchedCustomer);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchCustomer();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg m-4">
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>
      <ul>
        {Customer.map((customer, index) => (
          <li key={index} className="mb-2 p-4 border rounded-lg">
            <p><strong>Nome:</strong> {customer.customerName}</p>
            <p><strong>CPF:</strong> {customer.cpf}</p>
            <p><strong>Telefone:</strong> {customer.phoneNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerComponent;

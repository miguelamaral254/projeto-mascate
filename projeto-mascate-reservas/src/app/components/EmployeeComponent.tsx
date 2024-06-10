"use client"
import React, { useState, useEffect } from 'react';
import { Employee } from '../types/employee';
import { getEmployees } from '../services/getEmployeeService';

const EmployeeComponent: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const fetchedEmployees = await getEmployees();
        setEmployees(fetchedEmployees);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg m-4">
      <h2 className="text-2xl font-bold mb-4">Funcionários</h2>
      <ul>
        {employees.map((employee, index) => (
          <li key={index} className="mb-2 p-4 border rounded-lg">
            <p><strong>Id:</strong> {employee.employeeId}</p>
            <p><strong>Nome:</strong> {employee.name}</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeComponent;

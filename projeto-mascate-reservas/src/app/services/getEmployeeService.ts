// services/employeeService.ts
import axios from 'axios';
import config from '../config';
import { EmployeeDTO } from '../types/employee';

export const getEmployees = async (): Promise<EmployeeDTO[]> => {
  try {
    const response = await axios.get(`${config.apiUrl}/employee/list`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error);
    throw error;
  }
};

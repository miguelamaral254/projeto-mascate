import axios from 'axios';
import config from '../config';
import { Employee} from '../types/employee';

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await axios.get(`${config.apiUrl}/employee/getEmployee`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error);
    throw error;
  }
};

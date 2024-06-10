import axios from 'axios';
import config from '../config';
import { Customer } from '../types/customer';

export const getCustomer = async (): Promise<Customer[]> => {
  try {
    const response = await axios.get(`${config.apiUrl}/customer/getCustomer`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};

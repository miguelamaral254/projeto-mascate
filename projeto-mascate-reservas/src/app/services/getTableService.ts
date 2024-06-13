import axios from 'axios';
import config from '../config';
import { Table, Checkout } from '../types/table';

export const getTables = async (): Promise<Table[]> => {
  try {
    const response = await axios.get(`${config.apiUrl}/table/getTable`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar mesas:', error);
    throw error;
  }
};

import axios from 'axios';
import config from '../config';
import { TableDTO, CheckoutDTO } from '../types/ctable';

export const getTables = async (): Promise<TableDTO[]> => {
  try {
    const response = await axios.get(`${config.apiUrl}/table/getTable`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar mesas:', error);
    throw error;
  }
};

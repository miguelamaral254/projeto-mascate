// services/clientService.ts
import axios from 'axios';
import config from '../config';
import { ClientDTO } from '../types/client';

export const getClients = async (): Promise<ClientDTO[]> => {
  try {
    const response = await axios.get(`${config.apiUrl}/client/list`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};

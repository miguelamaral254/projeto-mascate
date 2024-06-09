import axios from 'axios';
import config from '../config'; 
export const fetchReservations = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}/reservation/reservationList`); 
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as reservas:', error);
    return [];
  }
};

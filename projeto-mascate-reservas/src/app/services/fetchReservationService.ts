import axios from 'axios';

export const fetchReservations = async () => {
  try {
    const response = await axios.get('http://localhost:8080/reservation/reservationList');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as reservas:', error);
    return [];
  }
};

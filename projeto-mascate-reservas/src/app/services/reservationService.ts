<<<<<<< HEAD
import axios from 'axios';
import { Reservation } from '../types/reservation';

const API_URL = 'http://localhost:8080/api';

export const createReservation = async (reservationData: Reservation): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/reservation`, reservationData);
    if (response.status !== 200) {
      throw new Error('Failed to create reservation');
    }
  } catch (error) {
    throw new Error('An unknown error occurred');
  }
};
=======
import axios from 'axios';
import { Reservation } from '../types/reservation';

const API_URL = 'http://localhost:8080/reservation/reservar';

export const createReservation = async (reservationData: Reservation): Promise<void> => {
  try {
    const response = await axios.post(API_URL, reservationData);
    if (response.status !== 200) {
      throw new Error('Failed to create reservation');
    }
  } catch (error) {
    throw new Error('An unknown error occurred');
  }
};
>>>>>>> 71cfc97e528b605ea6d496a1cbf017de42744b35

import axios from 'axios';
import { FormData } from '../types/formData';
import config from '../config';


const API_URL = 'http://localhost:8080/reservation/reservar'; 

export const createReservation = async (formData: FormData): Promise<void> => {
  try {
    
    const response = await axios.post(`${config.apiUrl}/reservation/reservar`,formData);

    if (response.status !== 200) {
      throw new Error('Failed to create reservation');
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
      throw new Error(`Error: ${errorMessage}, Status: ${error.response?.status}`);
    } else {
      throw new Error(`An unknown error occurred: ${error.message}`);
    }
  }
};

import axios from 'axios';
import { FormData } from '../types/formData';
import config from '../config';
export const createReservation = async (formData: FormData): Promise<void> => {
  try {
    const response = await axios.post(`${config.apiUrl}/reservation/reservar`,formData);

    //console.log(response.status);  //depurar response

    if (response.status !== 201) {
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

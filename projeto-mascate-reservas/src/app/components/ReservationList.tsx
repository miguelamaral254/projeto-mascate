import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('http://localhost:8080/reservation/reservationList');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro ao buscar as reservas:', error);
    res.status(500).json({ message: 'Erro ao buscar as reservas' });
  }
}
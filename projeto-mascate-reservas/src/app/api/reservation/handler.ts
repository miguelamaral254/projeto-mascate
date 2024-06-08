import { NextApiRequest, NextApiResponse } from 'next';
import { Reservation } from '../../types/reservation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const reservation: Reservation = req.body;

    try {
      const response = await fetch('http://localhost:8080/reservation/reservar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      });

      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }

      res.status(200).json({ message: 'Reservation created successfully' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

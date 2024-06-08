import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { date, time, tableType, customerName, cpf, phoneNumber, employeeId, table } = req.body;

    try {``
      const response = await fetch('http://localhost:8080/reservation/reservar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, time, tableType, customerName, cpf, phoneNumber, employeeId, table }),
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

// /pages/api/reservation.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { date, time, tableType } = req.body;
    // Aqui você pode salvar os dados no banco de dados
    res.status(200).json({ message: 'Reserva criada com sucesso!' });
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}

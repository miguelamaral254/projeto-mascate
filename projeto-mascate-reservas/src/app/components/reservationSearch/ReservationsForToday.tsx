"use client"
import React from 'react';
import ReservationCard from '../ReservationCard';
import Reservation from '../../types/reservation';

interface ReservationsForTodayProps {
  reservations: Reservation[];
  onCheckout: (idReservation: number, checkoutTime: string) => void;
}

const ReservationsForToday: React.FC<ReservationsForTodayProps> = ({ reservations, onCheckout }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Reservas para hoje</h2>
      {reservations.length === 0 ? (
        <p>Não há reservas para hoje.</p>
      ) : (
        <div className="flex flex-wrap">
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.idReservation}
              reservation={reservation}
              onCheckout={onCheckout}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationsForToday;

"use client"
import React from 'react';
import ReservationCard from '../ReservationCard';
import Reservation from '../../types/reservation';

interface ActiveReservationsProps {
  reservations: Reservation[];
  onCheckout: (idReservation: number, checkoutTime: string) => void;
}

const ActiveReservations: React.FC<ActiveReservationsProps> = ({ reservations, onCheckout }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Reservas ativas no momento</h2>
      {reservations.length === 0 ? (
        <p>Não há reservas ativas no momento.</p>
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

export default ActiveReservations;

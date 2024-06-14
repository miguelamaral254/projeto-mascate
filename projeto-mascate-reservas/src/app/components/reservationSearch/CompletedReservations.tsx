"use client"
import React from 'react';
import ReservationCard from '../ReservationCard';
import Reservation from '../../types/reservation';

interface CompletedReservationsProps {
  reservations: Reservation[];
  onCheckout: (idReservation: number, checkoutTime: string) => void;
}

const CompletedReservations: React.FC<CompletedReservationsProps> = ({ reservations, onCheckout }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Reservas finalizadas</h2>
      {reservations.length === 0 ? (
        <p>Não há reservas finalizadas.</p>
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

export default CompletedReservations;

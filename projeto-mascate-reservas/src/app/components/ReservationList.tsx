// src/components/ReservationList.tsx
import React, { useState } from 'react';
import ReservationCard from './ReservationCard';
import { Reservation } from '../../types/reservation';

const ReservationList: React.FC<{ reservations: Reservation[] }> = ({ reservations }) => {
  const [reservationList, setReservationList] = useState<Reservation[]>(reservations);

  const handleCheckout = (reservationId: number, checkoutTime: string) => {
    setReservationList((prev) =>
      prev.filter((reservation) => reservation.id !== reservationId)
    );
    console.log(`Reservation ID: ${reservationId}, Checkout Time: ${checkoutTime}`);
  };

  return (
    <div className="flex flex-wrap">
      {reservationList.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          onCheckout={handleCheckout}  // Passing the onCheckout function
        />
      ))}
    </div>
  );
};

export default ReservationList;

"use client"
import React, { useState, useEffect } from 'react';
import ReservationCard from './ReservationCard';
import { fetchReservations } from '../services/fetchReservationService';
import Reservation from '../types/reservation';

const SearchReservationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedReservations, setFetchedReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const getReservations = async () => {
      const reservations = await fetchReservations();
      console.log('Fetched Reservations:', reservations);
      setFetchedReservations(reservations);
    };

    getReservations();
  }, []);

  const handleCheckout = (idReservation: number, checkoutTime: string) => {
    console.log(`Reservation ID: ${idReservation}, Checkout Time: ${checkoutTime}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const searchResults = fetchedReservations.filter((reservation) => {
    const customerName = reservation.name.toLowerCase();
    const term = searchTerm.toLowerCase();
    return customerName.includes(term);
  });

  return (
    <div className="container justify-center items-center mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buscar Reservas</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className='flex'>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o nome do cliente..."
            className="border border-gray-300 rounded-md p-2 w-72"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
            Buscar
          </button>
        </div>
      </form>
      <div className="flex flex-wrap">
        {searchResults.map((reservation) => (
          <ReservationCard
            key={reservation.idReservation}
            reservation={reservation}
            onCheckout={handleCheckout}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchReservationsPage;

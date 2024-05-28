"use client"
import React, { useState } from 'react';
import ReservationCard from './ReservationCard';
import { Reservation } from '../../types/reservation';

const SearchReservationsPage: React.FC<{ reservations: Reservation[] }> = ({ reservations }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de busca aqui
  };

  const searchResults = reservations.filter((reservation) =>
    reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
};

export default SearchReservationsPage;

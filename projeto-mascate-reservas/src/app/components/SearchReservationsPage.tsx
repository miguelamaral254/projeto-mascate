import React, { useState } from 'react';
import ReservationCard from '../components/ReservationCards'; 

interface Reservation {
  id: number;
  customerName: string;
  cpf: string;
  phoneNumber: string;
  email: string;
  reservation: {
    date: string;
    time: string;
    tableNumber: number;
  };
}
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buscar Reservas</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite o nome do cliente..."
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
          Buscar
        </button>
      </form>
      <div>
        {searchResults.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} /> // Renderizando o componente de cartão para cada reserva encontrada
        ))}
      </div>
    </div>
  );
};

export default SearchReservationsPage;

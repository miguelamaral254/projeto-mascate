"use client"
import React, { useState, useEffect } from 'react';
import ReservationCategoryCard from './reservationSearch/ReservationCategoryCard';
import ReservationsForToday from './reservationSearch/ReservationsForToday';
import ActiveReservations from './reservationSearch/ActiveReservations';
import CompletedReservations from './reservationSearch/CompletedReservations';
import { fetchReservations } from '../services/getReservationService';
import Reservation from '../types/reservation';


const SearchReservationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedReservations, setFetchedReservations] = useState<Reservation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    const customerName = reservation.customer.customerName.toLowerCase();
    const term = searchTerm.toLowerCase();
    return customerName.includes(term);
  });
  const reservationsForToday = searchResults.filter(reservation => !reservation.checkin && !reservation.checkout);
  const activeReservations = searchResults.filter(reservation => reservation.checkin && !reservation.checkout);
  const completedReservations = searchResults.filter(reservation => reservation.checkin && reservation.checkout);
  

  const renderSelectedCategory = () => {
    switch (selectedCategory) {
      case 'today':
        return <ReservationsForToday reservations={reservationsForToday} onCheckout={handleCheckout} />;
      case 'active':
        return <ActiveReservations reservations={activeReservations} onCheckout={handleCheckout} />;
      case 'completed':
        return <CompletedReservations reservations={completedReservations} onCheckout={handleCheckout} />;
      default:
        return null;
    }
  };

  return (
    <div className="container justify-center items-center mx-auto p-4">
      {!selectedCategory ? (
        <div className="flex flex-col w-full min-h-96 items-center p-10">
          <h1 className="text-2xl font-bold mb-4">Selecione uma Categoria de Reserva</h1>
          <div className="flex justify-around w-full">
            <ReservationCategoryCard
              imageSrc="/images/incomeReservation.png" 
              title="Reservas para hoje"
              description="Visualize todas as reservas para hoje."
              onClick={() => setSelectedCategory('today')}
            />
            <ReservationCategoryCard
              imageSrc="/images/activatedReservation.png" 
              title="Reservas ativas no momento"
              description="Visualize todas as reservas ativas no momento."
              onClick={() => setSelectedCategory('active')}
            />
            <ReservationCategoryCard
              imageSrc="/images/completedReservation.png" 
              title="Reservas finalizadas"
              description="Visualize todas as reservas finalizadas."
              onClick={() => setSelectedCategory('completed')}
            />
          </div>
        </div>
      ) : (
        <div className="w-full">
          <button onClick={() => setSelectedCategory(null)} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">
            Voltar
          </button>
          {renderSelectedCategory()}
        </div>
      )}
    </div>
  );
};

export default SearchReservationsPage;

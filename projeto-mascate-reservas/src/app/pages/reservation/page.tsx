"use client"
import React from 'react';
import Navbar from "../../components/Navbar";
import SearchReservationsPage from '../../components/SearchReservationsPage';
import reservationsData from '../../data/reservationsData';
import ReservationForm from '@/app/components/ReservationForm';

export default function Home() {
  return (
    <div className="flex-1 h-full w-full justify-center items-center text-center">
      <Navbar/>
      <ReservationForm />
    </div>
  );
}

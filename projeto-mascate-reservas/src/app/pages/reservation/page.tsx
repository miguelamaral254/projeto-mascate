"use client"
import React from 'react';
import Navbar from "../../components/Navbar";
import ReservationForm from '@/app/components/ReservationForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-custom-bg bg-cover bg-center flex-1 h-full justify-center items-center text-center">
      <Navbar/>
      <ReservationForm />
    </div>
  );
}

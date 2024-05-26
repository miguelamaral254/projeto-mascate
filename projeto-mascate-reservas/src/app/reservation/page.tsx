"use client"

import ReservationForm from "@/app/components/ReservationForm";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="flex-1 h-full w-full justify-center items-center text-center">
      <Navbar/>
      <ReservationForm/>
      </div>
    );
}
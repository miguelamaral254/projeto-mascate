"use client"
import Banner from "./components/Banner";
import Form from "./components/ReservationForm";
import Navbar from "./components/Navbar";
import ReservationForm from "./components/ReservationForm";


export default function Home() {
  return (
    <div className="flex-1 h-full w-full justify-center items-center text-center">
      <Navbar/>
      <ReservationForm/>
      </div>
    );
}

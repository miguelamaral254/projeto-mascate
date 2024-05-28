import reservationsData from "@/app/data/reservationsData";
import Navbar from "../../components/Navbar";
import SearchReservationsPage from '../../components/SearchReservationsPage';


export default function Home() {
  return (
    <div className="flex-1 h-full w-full justify-center items-center text-center">
      <Navbar/>
      <SearchReservationsPage reservations={reservationsData} />
    </div>
  );
}

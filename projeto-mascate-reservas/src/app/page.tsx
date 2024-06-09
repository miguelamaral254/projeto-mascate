"use client";
import ClientComponent from "./components/ClientComponent";
import EmployeeComponent from "./components/EmployeeComponent";
import Navbar from "./components/Navbar";
import TableComponent from "./components/TableComponent";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-custom-bg bg-cover bg-center">
      <Navbar />



      <ClientComponent/>
      <TableComponent/>
      <EmployeeComponent/>
    </div>
  );
}

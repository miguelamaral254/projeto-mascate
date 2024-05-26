import Link from "next/link";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0"
          onClick={closeMenu}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full bg-red-900 text-white font-bold py-3 transform transition-all duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} w-64 z-10`}
      >
        <div className="container mx-auto flex flex-col items-center h-full">
          <nav className="flex flex-col items-center">
            <button className="absolute top-0 right-0 p-2" onClick={closeMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="flex flex-col space-y-4">
              <li>
                <Link href="/">
                  <span className="hover:text-gray-200 cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/reservation">
                  <span className="hover:text-gray-200 cursor-pointer">Nova Reserva</span>
                </Link>
              </li>
              <li>
                <Link href="/consult-reservations">
                  <span className="hover:text-gray-200 cursor-pointer">Consultar Reservas</span>
                </Link>
              </li>
              <li>
                <Link href="/settings">
                  <span className="hover:text-gray-200 cursor-pointer">Configurações</span>
                </Link>
              </li>
              <li>
                <Link href="/logout">
                  <span className="hover:text-gray-200 cursor-pointer">Sair</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex  bg-red-600 w-full">
        <button onClick={toggleMenu}>
          <IoMdMenu className="text-3xl text-white" />
        </button>
      </div>
    </div>
  );
}

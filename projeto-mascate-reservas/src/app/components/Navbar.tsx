import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-red-900 text-white font-bold py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-4">Logo</div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
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
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <IoMdMenu className="text-3xl" />
          </button>
        </div>
        <div className={`fixed top-0 left-0 h-full bg-red-900 text-white font-bold py-3 transform transition-all duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden z-10`}>
          <nav>
            <ul>
              <li>
                <Link href="/">
                  <span className="block py-2 px-4 hover:bg-red-700 cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/reservation">
                  <span className="block py-2 px-4 hover:bg-red-700 cursor-pointer">Nova Reserva</span>
                </Link>
              </li>
              <li>
                <Link href="/consult-reservations">
                  <span className="block py-2 px-4 hover:bg-red-700 cursor-pointer">Consultar Reservas</span>
                </Link>
              </li>
              <li>
                <Link href="/settings">
                  <span className="block py-2 px-4 hover:bg-red-700 cursor-pointer">Configurações</span>
                </Link>
              </li>
              <li>
                <Link href="/logout">
                  <span className="block py-2 px-4 hover:bg-red-700 cursor-pointer">Sair</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {isOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0"
            onClick={toggleMenu}
          />
        )}
      </div>
    </div>
  );
}

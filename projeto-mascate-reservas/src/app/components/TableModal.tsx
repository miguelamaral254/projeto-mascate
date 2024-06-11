import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Swal from 'sweetalert2';
import Btn from './Btn';

interface TableModalProps {
  table: { type: string; tableID: number; size: string; chairs: number };
  onClose: () => void;
  onSelect: (chairs: number) => void;
}

const TableModal: React.FC<TableModalProps> = ({ table, onClose, onSelect }) => {
  const [chairs, setChairs] = useState(table.size === 'G' ? 6 : table.size === 'M' ? 4 : 2);

  const increaseChairs = () => {
    if (table.size === 'G' && chairs < 8) {
      setChairs(chairs + 1);
    } else if (table.size === 'M' && chairs < 6) {
      setChairs(chairs + 1);
    } else if (table.size === 'P' && chairs < 4) {
      setChairs(chairs + 1);
    }
  };

  const decreaseChairs = () => {
    if (table.size === 'G' && chairs > 6) {
      setChairs(chairs - 1);
    } else if (table.size === 'M' && chairs > 4) {
      setChairs(chairs - 1);
    } else if (table.size === 'P' && chairs > 2) {
      setChairs(chairs - 1);
    }
  };

  const handleSelectTable = () => {
    onSelect(chairs);
    onClose();
    Swal.fire('Mesa Selecionada', `Você selecionou a mesa ${table.tableID} com ${chairs} cadeiras.`, 'success'); // Exibe um alerta informando a seleção
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black p-5 rounded-lg text-yellow-300/75 ">
        <h2 className="text-xl text-yellow-300 font-bold">Detalhes da Mesa</h2>
        <p>Mesa Número: {table.tableID}</p>
        <p>Tamanho: {table.size}</p>
        <p>Número de Cadeiras: {chairs}</p>
        <div className="mt-4 gap-2 flex justify-end">
          <Btn onClick={increaseChairs} text="+" />
          <Btn onClick={decreaseChairs} text="-" />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleSelectTable}
          >
            Selecionar
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TableModal;

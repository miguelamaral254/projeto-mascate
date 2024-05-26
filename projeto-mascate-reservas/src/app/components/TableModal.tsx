import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Swal from 'sweetalert2';

interface TableModalProps {
  table: { type: string; number: number; size: string };
  onClose: () => void;
  onSelect: (numChairs: number) => void;
}

const TableModal: React.FC<TableModalProps> = ({ table, onClose, onSelect }) => {
  const [numChairs, setNumChairs] = useState(table.size === 'G' ? 6 : table.size === 'M' ? 4 : 2);

  const increaseChairs = () => {
    if (table.size === 'G' && numChairs < 8) {
      setNumChairs(numChairs + 1);
    } else if (table.size === 'M' && numChairs < 6) {
      setNumChairs(numChairs + 1);
    } else if (table.size === 'P' && numChairs < 4) {
      setNumChairs(numChairs + 1);
    }
  };

  const decreaseChairs = () => {
    if (table.size === 'G' && numChairs > 6) {
      setNumChairs(numChairs - 1);
    } else if (table.size === 'M' && numChairs > 4) {
      setNumChairs(numChairs - 1);
    } else if (table.size === 'P' && numChairs > 2) {
      setNumChairs(numChairs - 1);
    }
  };

  const handleSelectTable = () => {
    onSelect(numChairs); // Passa o número de cadeiras selecionado para a função onSelect
    onClose();
    Swal.fire('Mesa Selecionada', `Você selecionou a mesa ${table.number} com ${numChairs} cadeiras.`, 'success');
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold">Detalhes da Mesa</h2>
        <p>Mesa Número: {table.number}</p>
        <p>Tamanho: {table.size}</p>
        <p>Número de Cadeiras: {numChairs}</p>
        <div className="mt-4 flex justify-end">
          <button
            className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mr-2 ${numChairs >= (table.size === 'G' ? 8 : table.size === 'M' ? 6 : 4) && 'opacity-50 cursor-not-allowed'}`}
            onClick={increaseChairs}
          >
            +
          </button>
          <button
            className={`bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ${numChairs <= (table.size === 'G' ? 6 : table.size === 'M' ? 4 : 2) && 'opacity-50 cursor-not-allowed'}`}
            onClick={decreaseChairs}
          >
            -
          </button>
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

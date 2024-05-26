import React, { useState } from 'react';
import { createPortal } from 'react-dom';

interface TableModalProps {
  table: { type: string, number: number, size: string }; // Adicionado size
  onClose: () => void;
  onSelect: () => void;
}

const TableModal: React.FC<TableModalProps> = ({ table, onClose, onSelect }) => {
  const [numChairs, setNumChairs] = useState(table.size === 'G' ? 6 : table.size === 'M' ? 4 : 2); // Inicializa o número de cadeiras baseado no tamanho da mesa

  const increaseChairs = () => {
    if (numChairs < (table.size === 'G' ? 8 : table.size === 'M' ? 6 : 4)) { // Verifica se o número de cadeiras não ultrapassa o limite máximo baseado no tamanho da mesa
      setNumChairs(numChairs + 1);
    }
  };

  const decreaseChairs = () => {
    if (numChairs > (table.size === 'P' ? 2 : 1)) { // Verifica se o número de cadeiras não ultrapassa o limite mínimo baseado no tamanho da mesa
      setNumChairs(numChairs - 1);
    }
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold">Detalhes da Mesa</h2>
        <p>Mesa Número: {table.number}</p>
        <p>Tamanho: {table.size}</p> {/* Adiciona o tamanho da mesa */}
        <p>Número de Cadeiras: {numChairs}</p>
        <div className="mt-4 flex justify-end">
          <button
            className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mr-2 ${numChairs >= (table.size === 'G' ? 8 : table.size === 'M' ? 6 : 4) && 'opacity-50 cursor-not-allowed'}`} // Desabilita o botão de adicionar se o número de cadeiras atingiu o limite máximo
            onClick={increaseChairs}
          >
            +
          </button>
          <button
            className={`bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ${numChairs <= (table.size === 'P' ? 2 : 1) && 'opacity-50 cursor-not-allowed'}`} // Desabilita o botão de remover se o número de cadeiras atingiu o limite mínimo
            onClick={decreaseChairs}
          >
            -
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={onSelect}
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

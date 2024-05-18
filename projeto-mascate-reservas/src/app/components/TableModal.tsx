// /components/TableModal.tsx
import React from 'react';
import { createPortal } from 'react-dom';

interface TableModalProps {
  table: { type: string, number: number };
  onClose: () => void;
}

const TableModal: React.FC<TableModalProps> = ({ table, onClose }) => {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold">Detalhes da Mesa</h2>
        <p>Mesa Número: {table.number}</p>
        <p>Tipo: {table.type.replace('_', ' ')}</p>
        <p>Cadeiras: {table.type.split('_')[0]}</p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>,
    document.body
  );
};

export default TableModal;

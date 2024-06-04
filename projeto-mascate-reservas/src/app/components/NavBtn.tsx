import React from 'react';

interface NavBtnProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

const NavBtn: React.FC<NavBtnProps> = ({ onClick, text, disabled }) => {
  // Determinar a cor com base no texto
  const color = text.toLowerCase() === 'next' ? 'blue' : text.toLowerCase() === 'back' ? 'red' : 'none';
  
  // Determinar a cor de fundo com base no estado disabled
  const backgroundColor = disabled ? 'bg-gray-300' : `bg-${color}-500`;

  // Determinar a classe condicional para o hover com base no estado disabled
  const hoverColor = disabled ? '' : `hover:bg-${color}-600`;

  // Atribuir o texto correto com base no texto fornecido
  const buttonText = text.toLowerCase() === 'next' ? 'Próximo' : text.toLowerCase() === 'back' ? 'Voltar' : '';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-2 px-4 ${backgroundColor} text-white rounded-md ${hoverColor} transition duration-300`}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default NavBtn;

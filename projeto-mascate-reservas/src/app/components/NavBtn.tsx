"use client"
import React from 'react';

interface NavBtnProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

const NavBtn: React.FC<NavBtnProps> = ({ onClick, text, disabled }) => {
  const color = text.toLowerCase() === 'next' ? 'yellow' : text.toLowerCase() === 'back' ? 'red' : 'none';
  const textColor = text.toLowerCase() === 'next' ? 'black' : text.toLowerCase() === 'back' ? 'white' : 'none';
  const backgroundColor = disabled ? 'bg-gray-300' : `bg-${color}-300`;
  const hoverColor = disabled ? '' : `hover:bg-${color}-600`;
  const buttonText = text.toLowerCase() === 'next' ? 'Próximo' : text.toLowerCase() === 'back' ? 'Voltar' : '';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-2 px-4 ${backgroundColor} ${textColor} rounded-md ${hoverColor} transition duration-300`}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default NavBtn;

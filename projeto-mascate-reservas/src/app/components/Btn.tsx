import React from 'react';

interface NavBtnProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

const Btn: React.FC<NavBtnProps> = ({ onClick, text, disabled }) => {
  const baseClasses = 'py-2 px-4 rounded-md transition duration-300';
  const backgroundColor = disabled ? 'bg-gray-300' : 'bg-primary';
  const textColor = disabled ? 'text-gray-500' : 'text-secondary';
  const hoverColor = disabled ? '' : 'hover:bg-primary-dark';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${backgroundColor} ${textColor} ${hoverColor}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Btn;

import React from 'react';

interface DebugButtonProps {
  text: any;}

const DebugButton: React.FC<DebugButtonProps> = ({ text }) => {
  const handleClick = () => {
    console.log(text);
  };

  return (
    <button onClick={handleClick}>
      Debug
    </button>
  );
};

export default DebugButton;

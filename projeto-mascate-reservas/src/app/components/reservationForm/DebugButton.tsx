<<<<<<< HEAD
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
=======
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
>>>>>>> 71cfc97e528b605ea6d496a1cbf017de42744b35

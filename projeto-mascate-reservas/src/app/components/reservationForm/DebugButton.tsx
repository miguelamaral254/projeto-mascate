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
>>>>>>> 76f99b6e6e525005b39ba32222db072ed1c386c5
>>>>>>> 71cfc97e528b605ea6d496a1cbf017de42744b35

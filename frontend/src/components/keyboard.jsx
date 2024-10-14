import React from 'react';

const Keyboard = ({ onKeyPress, onEnter, onDelete }) => {
  const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';

  return (
    <div className="flex flex-wrap justify-center space-x-1 mt-4">
      {letters.split('').map((letter) => (
        <button
          key={letter}
          onClick={() => onKeyPress(letter)}
          className="w-10 h-10 m-1 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          {letter}
        </button>
      ))}
      <button onClick={onEnter} className="w-20 h-10 bg-blue-600 text-white rounded m-1">
        Enter
      </button>
      <button onClick={onDelete} className="w-20 h-10 bg-red-600 text-white rounded m-1">
        Delete
      </button>
    </div>
  );
};

export default Keyboard;

import React from 'react';
import clsx from 'clsx';

const InputBoxes = ({ guesses, wordToGuess, currentGuess }) => {
  const getColor = (letter, index, guessIndex) => {
    if (!wordToGuess || guessIndex >= guesses.length) return '';

    if (wordToGuess[index] === letter) {
      return 'bg-green-500 text-white';
    } else if (wordToGuess.includes(letter)) {
      return 'bg-yellow-500 text-white'; 
    } else {
      return 'bg-gray-800 text-white';
    }
  };

  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, guessIndex) => (
        <div key={guessIndex} className="flex justify-center">
          {Array.from({ length: 5 }).map((_, index) => {
            const letter = guesses[guessIndex]?.[index] || (guessIndex === guesses.length ? currentGuess[index] : '');

            return (
              <div
                key={index}
                className={clsx(
                  'w-12 h-12 border border-gray-500 m-1 flex items-center justify-center text-xl font-bold',
                  getColor(letter, index, guessIndex)
                )}
              >
                {letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default InputBoxes;

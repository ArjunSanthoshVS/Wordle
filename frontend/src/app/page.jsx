"use client"

import React, { useState, useEffect } from 'react';
import Test from '../components/footer'
import Navbar from '../components/navbar'
import InputBoxes from '../components/inputBoxes';
import Keyboard from '../components/keyboard';

const wordToGuess = "ACTOR";

export default function Home() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentAttempt, setCurrentAttempt] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (key === 'Enter') {
        handleEnter();
      } else if (key === 'Backspace') {
        handleDelete();
      } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
        handleKeyPress(key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentGuess]);

  const handleKeyPress = (letter) => {
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + letter);
    }
  };

  const handleEnter = () => {
    if (currentGuess.length === 5) {
      const updatedGuesses = [...guesses, currentGuess];
      setGuesses(updatedGuesses);

      // if (currentGuess === wordToGuess) {
      //   alert('Congratulations! You guessed the word!');
      // }

      setCurrentGuess('');
      setCurrentAttempt((prev) => prev + 1);

      if (currentAttempt >= 5 && currentGuess !== wordToGuess) {
        alert(`Out of attempts! The word was ${wordToGuess}.`);
      }
    }
  };

  const handleDelete = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
          <h1 className="text-4xl font-bold mb-6">Word Puzzle</h1>
          <InputBoxes guesses={guesses} wordToGuess={wordToGuess} currentGuess={currentGuess} />
          <Keyboard onKeyPress={handleKeyPress} onEnter={handleEnter} onDelete={handleDelete} />
        </div>
      <Test />
      </div>
    </>
  );
}

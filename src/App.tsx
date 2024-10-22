import React, { useState, useEffect } from 'react';
import { Shuffle, Volume2, VolumeX } from 'lucide-react';
import Card from './components/Card';
import Header from './components/Header';
import Timer from './components/Timer';
import DifficultySelector from './components/DifficultySelector';
import ThemeSelector from './components/ThemeSelector';
import Leaderboard from './components/Leaderboard';

const themes = {
  fruits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  animals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  landmarks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

const difficulties = {
  easy: { rows: 3, cols: 4 },
  medium: { rows: 4, cols: 4 },
  hard: { rows: 5, cols: 4 },
};

const createBoard = (theme, difficulty) => {
  const { rows, cols } = difficulties[difficulty];
  const totalCards = rows * cols;
  const selectedImages = themes[theme].slice(0, totalCards / 2);
  
  return [...selectedImages, ...selectedImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ 
      id: Math.random(), 
      src: `https://source.unsplash.com/random/300x300?${theme}=${card}`, 
      isFlipped: false, 
      isMatched: false 
    }));
};

function App() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [theme, setTheme] = useState('fruits');
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [bestTimes, setBestTimes] = useState({});

  useEffect(() => {
    resetGame();
  }, [difficulty, theme]);

  useEffect(() => {
    if (firstCard !== null && secondCard !== null) {
      setMoves((prev) => prev + 1);
      if (cards[firstCard].src === cards[secondCard].src) {
        setCards((prevCards) =>
          prevCards.map((card, index) =>
            index === firstCard || index === secondCard ? { ...card, isMatched: true } : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
        playSound('match');
        resetTurn();
      } else {
        playSound('flip');
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstCard, secondCard]);

  useEffect(() => {
    if (matchedPairs === cards.length / 2 && matchedPairs !== 0) {
      setIsGameStarted(false);
      updateBestTime();
    }
  }, [matchedPairs]);

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
  };

  const handleCardClick = (index) => {
    if (!isGameStarted) setIsGameStarted(true);
    if (firstCard === null && secondCard === null && !cards[index].isFlipped) {
      flipCard(index);
      setFirstCard(index);
      playSound('flip');
    } else if (firstCard !== null && secondCard === null && !cards[index].isFlipped && firstCard !== index) {
      flipCard(index);
      setSecondCard(index);
      playSound('flip');
    }
  };

  const flipCard = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, idx) =>
        idx === index ? { ...card, isFlipped: true } : card
      )
    );
  };

  const resetGame = () => {
    setCards(createBoard(theme, difficulty));
    setFirstCard(null);
    setSecondCard(null);
    setMoves(0);
    setMatchedPairs(0);
    setIsGameStarted(false);
  };

  const playSound = (sound) => {
    if (isSoundOn) {
      const audio = new Audio(`/sounds/${sound}.mp3`);
      audio.play();
    }
  };

  const updateBestTime = (time) => {
    setBestTimes((prev) => {
      const key = `${difficulty}-${theme}`;
      const currentBest = prev[key] || Infinity;
      return {
        ...prev,
        [key]: Math.min(currentBest, time),
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <Header moves={moves} matchedPairs={matchedPairs} totalPairs={cards.length / 2} />
      <div className="flex space-x-4 mb-4">
        <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
        <ThemeSelector theme={theme} setTheme={setTheme} />
        <button
          onClick={() => setIsSoundOn(!isSoundOn)}
          className="bg-white text-indigo-600 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-indigo-100 transition duration-300"
        >
          {isSoundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>
      <Timer isGameStarted={isGameStarted} onTimeUpdate={updateBestTime} />
      <div className={`grid grid-cols-${difficulties[difficulty].cols} gap-4 max-w-3xl mx-auto my-8`}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      <button
        onClick={resetGame}
        className="bg-white text-indigo-600 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-indigo-100 transition duration-300 flex items-center mb-4"
      >
        <Shuffle className="mr-2" size={20} />
        New Game
      </button>
      <Leaderboard bestTimes={bestTimes} />
    </div>
  );
}

export default App;
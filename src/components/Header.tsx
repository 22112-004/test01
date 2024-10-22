import React from 'react';

interface HeaderProps {
  moves: number;
  matchedPairs: number;
  totalPairs: number;
}

const Header: React.FC<HeaderProps> = ({ moves, matchedPairs, totalPairs }) => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold text-white mb-4">Image Matching Game</h1>
      <div className="flex justify-center space-x-8">
        <div className="bg-white rounded-full px-4 py-2 shadow-lg">
          <span className="font-semibold text-indigo-600">Moves: {moves}</span>
        </div>
        <div className="bg-white rounded-full px-4 py-2 shadow-lg">
          <span className="font-semibold text-indigo-600">
            Matches: {matchedPairs} / {totalPairs}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
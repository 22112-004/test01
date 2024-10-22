import React from 'react';

interface DifficultySelectorProps {
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ difficulty, setDifficulty }) => {
  return (
    <select
      value={difficulty}
      onChange={(e) => setDifficulty(e.target.value)}
      className="bg-white text-indigo-600 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-indigo-100 transition duration-300"
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  );
};

export default DifficultySelector;
import React from 'react';

interface LeaderboardProps {
  bestTimes: Record<string, number>;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ bestTimes }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
      <h2 className="text-2xl font-bold text-indigo-600 mb-2">Best Times</h2>
      <ul>
        {Object.entries(bestTimes).map(([key, time]) => (
          <li key={key} className="text-indigo-600">
            {key}: {formatTime(time)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
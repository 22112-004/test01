import React, { useState, useEffect } from 'react';

interface TimerProps {
  isGameStarted: boolean;
  onTimeUpdate: (time: number) => void;
}

const Timer: React.FC<TimerProps> = ({ isGameStarted, onTimeUpdate }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isGameStarted) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    } else {
      setTime(0);
    }

    return () => clearInterval(interval);
  }, [isGameStarted, onTimeUpdate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-full px-4 py-2 shadow-lg mb-4">
      <span className="font-semibold text-indigo-600">Time: {formatTime(time)}</span>
    </div>
  );
};

export default Timer;
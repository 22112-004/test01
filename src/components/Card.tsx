import React from 'react';

interface CardProps {
  card: {
    src: string;
    isFlipped: boolean;
    isMatched: boolean;
  };
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <div
      className={`relative w-24 h-24 sm:w-32 sm:h-32 cursor-pointer transition-transform duration-300 transform ${
        card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
      }`}
      onClick={onClick}
    >
      <div className="absolute w-full h-full backface-hidden">
        <div className="w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center">
          <span className="text-4xl">?</span>
        </div>
      </div>
      <div className="absolute w-full h-full backface-hidden rotate-y-180">
        <img
          src={card.src}
          alt="Card"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Card;
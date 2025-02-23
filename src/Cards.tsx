import React from "react";
import coverImage from "/img/cover.png";

interface Card {
  id: string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface CardProps {
  card: Card;
  onClick: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  const handleClick = () => {
    if (!card.isFlipped && !card.isMatched) {
      onClick(card.id);
    }
  };

  return (
    <div
      className={`w-20 h-20 rounded-lg shadow-inner flex items-center justify-center cursor-pointer transition duration-300 ${
        card.isFlipped ? "bg-gray-200" : "bg-gray-300"
      } ${card.isMatched ? "opacity-50" : ""}`}
      onClick={handleClick}
    >
      {card.isFlipped ? (
        <img src={card.image} alt="Card" className="max-w-full max-h-full" />
      ) : (
        <img
          src={coverImage}
          alt="Card Cover"
          className="w-full h-full rounded-lg object-cover"
        />
      )}
    </div>
  );
};

export default Card;

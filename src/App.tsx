import React, { useState, useEffect } from "react";
import Card from "./Cards";
import { v4 as uuidv4 } from "uuid";

const cardImages = [
  { src: "/img/1.png" },
  { src: "/img/2.png" },
  { src: "/img/3.png" },
  { src: "/img/4.png" },
  { src: "/img/5.png" },
  { src: "/img/6.png" },
  { src: "/img/7.png" },
  { src: "/img/8.png" },
];

const App: React.FC = () => {
  const shuffleCards = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const generateCards = () => {
    const shuffled = shuffleCards(cardImages);
    const cards: Card[] = [];
    shuffled.forEach((image) => {
      cards.push({
        id: uuidv4(),
        image: image.src,
        isFlipped: false,
        isMatched: false,
      });
      cards.push({
        id: uuidv4(),
        image: image.src,
        isFlipped: false,
        isMatched: false,
      });
    });
    return shuffleCards(cards);
  };

  const [cards, setCards] = useState<Card[]>(generateCards());
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleCardClick = (id: string) => {
    if (
      isFlipping ||
      flippedCards.length >= 2 ||
      matchedPairs.includes(id) ||
      cards.find((card) => card.id === id)?.isFlipped
    ) {
      return;
    }

    const updatedCards = [...cards];
    const cardIndex = updatedCards.findIndex((card) => card.id === id);

    if (cardIndex !== -1) {
      const clickedCard = updatedCards[cardIndex];

      if (!clickedCard.isFlipped) {
        // Only flip if not already flipped
        clickedCard.isFlipped = true;
        setCards([...updatedCards]); // Force re-render with updated cards
        setFlippedCards([...flippedCards, id]);

        if (flippedCards.length === 1) {
          const [id1] = flippedCards;
          const card1 = updatedCards.find((card) => card.id === id1);
          const card2 = updatedCards.find((card) => card.id === id);

          if (card1 && card2 && card1.image === card2.image) {
            setMatchedPairs([...matchedPairs, id1, id]);
            const matchUpdate = updatedCards.map((card) => {
              if (card.id === id1 || card.id === id) {
                return { ...card, isMatched: true };
              } else {
                return card;
              }
            });
            setCards(matchUpdate);
            setFlippedCards([]);
          } else {
            setIsFlipping(true);
            setTimeout(() => {
              const noMatchUpdate = updatedCards.map((card) => {
                if (card.id === id1 || card.id === id) {
                  return { ...card, isFlipped: false };
                } else {
                  return card;
                }
              });
              setCards(noMatchUpdate);
              setFlippedCards([]);
              setIsFlipping(false);
            }, 1000);
          }
        }
      }
    }
  };

  const handleNewGame = () => {
    setCards(generateCards());
    setFlippedCards([]);
    setMatchedPairs([]);
  };

  useEffect(() => {
    // Check for win condition
    if (matchedPairs.length === cardImages.length * 2) {
      alert("You won!");
    }
  }, [matchedPairs]);

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h1 className="text-2xl font-bold mb-4">Memory Game</h1>
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <Card key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleNewGame}
      >
        New Game
      </button>
    </div>
  );
};

export default App;

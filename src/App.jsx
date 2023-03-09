import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const Images = [
  { src: "/img/naeem.jpg", matched: false },
  { src: "/img/caleb.jpg", matched: false },
  { src: "/img/gavin.jpg", matched: false },
  { src: "/img/oteng.jpg", matched: false },
  { src: "/img/machai.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [userTurns, setUserTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const randomiseImages = () => {
    const randomisedImages = [...Images, ...Images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setFirstChoice(null);
    setSecondChoice(null);
    setCards(randomisedImages);
    setUserTurns(0);
  };

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  console.log(cards);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setUserTurns((prevUserTurns) => prevUserTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    randomiseImages();
  }, []);

  return (
    <div className="App">
      <h1>Match Our Developers</h1>
      <hr />

      <div className="images-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === firstChoice || card === secondChoice || card.matched
            }
            disabled={disabled}
          />
        ))}
      </div>
      <button onClick={randomiseImages}>Restart</button>
      <p>Attempts: {userTurns} </p>
    </div>
  );
}

export default App;

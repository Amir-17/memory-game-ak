import { cardImg2x2, cardImg4x4, cardImg6x6, cardImg8x8 } from "./Images";
import React, { useState, useEffect } from "react";
import History from "./History";
import Modal from "./Modal";
import Cards from "./Card";

const MemoryGame = () => {
  const [player, setPlayer] = useState(
    JSON.parse(localStorage.getItem("player")) !== null
      ? JSON.parse(localStorage.getItem("player"))
      : []
  );
  const [isTop10MessageHidden, setIsTop10MessageHidden] = useState(true);
  const [gridTemplate, setGridTemplate] = useState("repeat(2,1fr");
  const [disabledButton, setDisabledButton] = useState(true);
  const [hiddenMessage, setHiddenMessage] = useState(true);
  const [cardDisabled, setCardDisabled] = useState(false);
  const [matchingCards, setMatchingCards] = useState([]);
  const [secondPicked, setSecondPicked] = useState(null);
  const [firstPicked, setFirstPicked] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(0);
  const [card, setCard] = useState([]);
  const [cols, setCols] = useState();

  const realPlayers =
    player &&
    player.filter((p) => {
      return p.isPlayer;
    });

  let Time = new Date();
  const EndGameTime = `${Time.getDay()}.${Time.getMonth()}.${Time.getFullYear()}.  ${Time.getHours()}:${Time.getMinutes()}.`;

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    let storedData = localStorage.getItem("player");
    if (storedData === null || storedData.length === 0) {
      let arr = [];
      for (let i = 1; i <= 10; i++) {
        arr.push({
          id: i,
          player: "unknown",
          numberOfTurns: 0,
          finishedGame: "",
          isPlayer: false,
        });
      }
      setPlayer([...arr]);
    }
  }, []);

  //checking if selected cards are matching
  useEffect(() => {
    if (firstPicked && secondPicked) {
      setCardDisabled(true);
      if (firstPicked.src === secondPicked.src) {
        setCard((prevCard) => {
          return prevCard.map((index) => {
            if (index.src === firstPicked.src) {
              setMatchingCards([...matchingCards, firstPicked, secondPicked]);
              return { ...index, matching: true };
            } else {
              return index;
            }
          });
        });
        resetCards();
      } else {
        setTimeout(() => resetCards(), 1000);
      }
    }
  }, [firstPicked, secondPicked, matchingCards, card]);

  const swapArrayElements = (array, i, j) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };

  const FYShuffle = (array) => {
    const length = array.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * i);
      swapArrayElements(array, i, randomIndex);
    }
    return array;
  };

  //increasing level based on matching cards
  useEffect(() => {
     if (matchingCards.length === 4) {
      setTimeout(() => {
         const shuffledImg4x4 = FYShuffle([...cardImg4x4, ...cardImg4x4]).map(
           (value) => ({ ...value, id: Math.random() * 100 })
         );
         setCard(shuffledImg4x4);
         setLevel((level) => level + 1);
         setGridTemplate("repeat(4,1fr");
         setCols(4);
       }, 1000);
     }
     if (matchingCards.length === 20) {
       setTimeout(() => {
         const shuffledImg6x6 = FYShuffle([...cardImg6x6, ...cardImg6x6]).map(
           (value) => ({ ...value, id: Math.random() * 100 })
         );
         setCard(shuffledImg6x6);
         setLevel((level) => level + 1);
         setGridTemplate("repeat(6,1fr");

         setCols(6);
       }, 1000);
     }
     if (matchingCards.length === 56) {
       setTimeout(() => {
         const shuffledImg8x8 = FYShuffle([...cardImg8x8, ...cardImg8x8]).map(
           (value) => ({ ...value, id: Math.random() * 100 })
         );
         setCard(shuffledImg8x8);
         setLevel((level) => level + 1);
         setGridTemplate("repeat(8,1fr");

         setCols(8);
       }, 1000);
     }
    if (matchingCards.length === 120) {
      const isTop10 =
        realPlayers.length === 0 || realPlayers.length < 10
          ? true
          : realPlayers[realPlayers.length - 1]?.numberOfTurns >= moves
          ? true
          : false;
      if (isTop10) {
        setTimeout(() => {
          setShowModal(true);
          setHiddenMessage(false);
        }, 500);
      } else {
        setIsTop10MessageHidden(false);
        setDisabledButton(false);
      }
    }
  }, [matchingCards]);

  console.log(realPlayers);
  console.log(moves);

  const shuffleCards = () => {
    const shuffledImg = FYShuffle([...cardImg2x2, ...cardImg2x2]).map(
      (value) => ({ ...value, id: Math.random() })
    );
    setCard(shuffledImg);
    setMoves(0);

    setCols(2);
  };

  const resetCards = () => {
    setFirstPicked(null);
    setSecondPicked(null);
    setMoves((prevTurn) => prevTurn++);
    setCardDisabled(false);
  };

  const pickingCard = (card) => {
    firstPicked ? setSecondPicked(card) : setFirstPicked(card);
    secondPicked ? setCardDisabled(true) : setCardDisabled(false);
  };

  const playAgain = () => {
    setDisabledButton(true);
    const shuffledImg2x2 = FYShuffle([...cardImg2x2, ...cardImg2x2]).map(
      (value) => ({ ...value, id: Math.random() * 10 })
    );
    setCard(shuffledImg2x2);
    setMoves(0);
    setCols(2);
    setLevel(0);
    setHiddenMessage(true);
    setIsTop10MessageHidden(true);
    matchingCards.length = 0;
  };

  const closeModal = () => {
    setShowModal(false);
    setDisabledButton(false);
  };

  const enableButton = () => {
    setDisabledButton(false);
  };

  return (
    <div className="memory_game_container">
      <h1 className="title">MEMORY GAME</h1>
      <div className="game_board">
        <div className="level_moves">
          <h3>
            Level: {level} || Moves: {moves}
          </h3>
        </div>

        <div
          className={`grid grid-cols-${cols}`}
          style={{
            gridTemplateColumns: gridTemplate,
          }}
        >
          {card.map((card) => (
            <Cards
              key={card.id}
              allcards={card}
              cols={cols}
              moves={moves}
              setMoves={setMoves}
              pickingCard={pickingCard}
              disabled={cardDisabled}
              isFlipped={
                card === firstPicked || card === secondPicked || card.matching
              }
            ></Cards>
          ))}
        </div>
        {showModal && (
          <Modal
            moves={moves}
            EndGameTime={EndGameTime}
            player={player}
            setPlayer={setPlayer}
            closingAction={closeModal}
            enableButton={enableButton}
            setHiddenMessage={setHiddenMessage}
            matchingCards={matchingCards}
          ></Modal>
        )}
        <button
          className="play_again_button"
          onClick={() => playAgain()}
          disabled={disabledButton}
        >
          Start new game
        </button>
        <h3 id="message" hidden={hiddenMessage}>
          Congratulations, You found all matches in just {moves} moves !!
        </h3>
        <h3 id="message" hidden={isTop10MessageHidden}>
          Unfortunately, you are not in Top 10. Try again!
        </h3>
      </div>
      <div style={{ position: "relative" }}>
        <History players={player} />
      </div>
    </div>
  );
};

export default MemoryGame;

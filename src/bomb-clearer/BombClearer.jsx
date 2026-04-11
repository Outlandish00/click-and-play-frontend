import { useEffect, useState } from "react";
import "./BombClearer.css";
import { bombGeneration, printBoard } from "../scripts/bombClearer-scripts";

export const BombClearer = () => {
  const [board, setBoard] = useState(null);
  const [revealedArray, setRevealedArray] = useState(Array(64).fill(false));
  useEffect(() => {
    const newBoard = bombGeneration(Array(64).fill(0));
    setBoard(newBoard);
  }, []);
  return (
    <>
      <div className="bomb-clearer-container">
        <div className="bomb-clearer-title">Bomb Clearer!</div>

        <div className="bomb-clearer-grid">
          {board &&
            board.map((value, index) => (
              <button
                className="grid-tile"
                key={index}
                onClick={() => {
                  let newRevealedArray = { ...revealedArray };
                  newRevealedArray[index] = true;
                  setRevealedArray(newRevealedArray);
                }}
              >
                {revealedArray[index] === true ? value : ""}
              </button>
            ))}
        </div>
        <div className="bomb-clearer-timer">
          fake-timer <div className="timer-button"> timerbutton</div>
        </div>
        <button
          onClick={() => {
            setRevealedArray(Array(64).fill(false));
            const newBoard = bombGeneration(Array(64).fill(0));
            setBoard(newBoard);
          }}
        >
          Restart
        </button>
      </div>
    </>
  );
};

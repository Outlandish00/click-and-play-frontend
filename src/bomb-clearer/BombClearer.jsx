import { useEffect, useState } from "react";
import "./BombClearer.css";
import { bombGeneration, checkGameOver } from "../scripts/bombClearer-scripts";
import { useNavigate } from "react-router-dom";

export const BombClearer = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [revealedArray, setRevealedArray] = useState(Array(64).fill(false));
  const [flagMode, setFlagMode] = useState(false);
  const [gameStatus, setGameStatus] = useState("playing");
  const [gameOver, setGameOver] = useState(false);
  //useEffect to generate board and do refresh cleaning
  useEffect(() => {
    const newBoard = bombGeneration(Array(64).fill(0));
    setBoard(newBoard);
    setGameOver(false);
    setGameStatus("playing");
    setRevealedArray(Array(64).fill(false));
    setFlagMode(false);
  }, []);

  //useEffect to toggle game over based on game status from function from scripts
  useEffect(() => {
    if (gameStatus === "loss" || gameStatus === "won") {
      setGameOver(true);
    }
  }, [gameStatus]);

  //function to restart game:
  const restart = () => {
    const newBoard = bombGeneration(Array(64).fill(0));
    setBoard(newBoard);
    setGameOver(false);
    setFlagMode(false);
    setGameStatus("playing");
    setRevealedArray(Array(64).fill(false));
  };

  const getTileValue = (value) => {
    if (value === "B") {
      return "💣";
    } else {
      return value;
    }
  };
  return (
    <>
      {gameOver && (
        <div className="bomb-game-over-container">
          <div className="bomb-game-over-inner">
            <div className="bomb-game-over-title">Game Over!</div>
            <div className="result">
              {gameStatus === "won" ? <>You Win!</> : <>You Lose!</>}
            </div>
            <div className="game-over-button-container">
              <button
                onClick={() => {
                  restart();
                }}
              >
                Play Again?
              </button>
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                Back To Home
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bomb-clearer-container">
        <div className="bomb-clearer-title">Bomb Clearer!</div>

        <div className="bomb-clearer-grid">
          {board &&
            board.map((value, index) => (
              <button
                className="grid-tile"
                key={index}
                onClick={() => {
                  if (flagMode === false) {
                    let newRevealedArray = [...revealedArray];
                    newRevealedArray[index] = true;
                    setRevealedArray(newRevealedArray);
                    setGameStatus(checkGameOver(board, revealedArray, index));
                  } else {
                    let newRevealedArray = [...revealedArray];
                    newRevealedArray[index] = "🏴";
                    setRevealedArray(newRevealedArray);
                    setGameStatus(checkGameOver(board, revealedArray, index));
                  }
                  console.log(index, revealedArray[index]);
                }}
              >
                {revealedArray[index] === true ? getTileValue(value) : ""}
                {revealedArray[index] === "🏴" ? "🏴" : ""}
              </button>
            ))}
        </div>
        <div className="flag-mode">
          <button
            className={flagMode ? "flag-on" : "flag-off"}
            onClick={() => {
              setFlagMode(!flagMode);
            }}
          >
            Flag Mode
          </button>
        </div>
        <div className="bomb-clearer-timer">
          fake-timer <div className="timer-button"> timerbutton</div>
        </div>
      </div>
    </>
  );
};

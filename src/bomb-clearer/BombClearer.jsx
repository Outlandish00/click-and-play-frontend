import { useEffect, useRef, useState } from "react";
import "./BombClearer.css";
import { bombGeneration, checkGameOver } from "../scripts/bombClearer-scripts";
import { useNavigate } from "react-router-dom";

export const BombClearer = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [revealedArray, setRevealedArray] = useState(Array(64).fill(false));
  const [flagMode, setFlagMode] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStatus, setGameStatus] = useState("playing");
  const [gameOver, setGameOver] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const intervalRef = useRef(null);
  const timeStampRef = useRef(null);
  //useEffect to generate board and do refresh cleaning
  useEffect(() => {
    const newBoard = bombGeneration(Array(64).fill(0));
    setBoard(newBoard);
    setGameOver(false);
    setGameStatus("playing");
    setRevealedArray(Array(64).fill(false));
    setFlagMode(false);
  }, []);
  // function to run timer:
  const timer = () => {
    setSecondsElapsed((Date.now() - timeStampRef.current) / 1000);
  };
  // function to format timer:
  const formatTimer = (secondsElapsed) => {
    let totalSeconds = Math.floor(secondsElapsed);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let secondString = String(seconds).padStart(2, "0");
    let minuteString = String(minutes).padStart(2, "0");
    return `${minuteString}:${secondString}`;
  };
  useEffect(() => {
    if (gameStarted === true && gameOver != true) {
      intervalRef.current = setInterval(timer, 100);
      timeStampRef.current = Date.now();
    }
    return () => clearInterval(intervalRef.current);
  }, [gameStarted, gameOver]);

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
    setGameStarted(false);
    setSecondsElapsed(0);
    clearInterval(intervalRef.current);
    timeStampRef.current = null;
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
                    setGameStatus(
                      checkGameOver(board, newRevealedArray, index, flagMode),
                    );
                  } else {
                    let newRevealedArray = [...revealedArray];
                    newRevealedArray[index] = "🏴";
                    setRevealedArray(newRevealedArray);
                    setGameStatus(
                      checkGameOver(board, newRevealedArray, index, flagMode),
                    );
                  }
                  if (gameStarted != true) {
                    setGameStarted(true);
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
        <div className="bomb-clearer-timer">{formatTimer(secondsElapsed)}</div>
      </div>
    </>
  );
};

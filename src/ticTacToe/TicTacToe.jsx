import { useEffect, useState } from "react";
import "./TicTacToe.css";
import { useNavigate } from "react-router-dom";
import { computerPick } from "../scripts/ticTacToe-scripts";

export const TicTacToe = () => {
  const navigate = useNavigate();
  //creates starting board, an array with 9 empty spaces
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X"); // set turns, X starts the turn by default
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [useComputer, setUseComputer] = useState(false);
  const [userSymbol, setUserSymbol] = useState("");
  const [computerSymbol, setComputerSymbol] = useState("");
  const [computerThinking, setComputerThinking] = useState(false);

  // stores the possible combos for either player to win
  const winningCombinations = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];
  useEffect(() => {
    if (!useComputer) return;

    // If it's the computer's turn…
    if (turn === computerSymbol && !gameOver) {
      setComputerThinking(true);

      // Delay the move
      const timeout = setTimeout(() => {
        if (
          turn === computerSymbol &&
          gameOver === false &&
          useComputer === true
        ) {
          const move = computerPick(
            board,
            computerSymbol,
            winningCombinations,
            userSymbol
          );
          handleClick(move);

          setComputerThinking(false);
        }
      }, 600); // 👈 600ms delay, adjust as you like

      return () => clearTimeout(timeout);
    }
  }, [board, turn, computerSymbol]);
  //checks the combo array to see if either player has a combo to win
  const checkWinner = (board) => {
    //cycles through the combo array
    for (let combo of winningCombinations) {
      //assigns each combo in the combo array to a variable
      const [a, b, c] = combo;
      //checks if board a is not null, and that board a, board b, and board c all match indicating a winning combo
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        //sets the winner as the value at board[a]
        setWinner(board[a]);
        //triggers game over screen
        setGameOver(true);
      }
    }
    return null; // no winner yet
  };
  const handleClick = (index) => {
    if (board[index]) return; //ignores click if space is taken because the starting board will be null
    const newBoard = [...board]; // creates a new copy of the board
    newBoard[index] = turn;
    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
  };
  useEffect(() => {
    if (board.includes(null) === false) {
      setGameOver(true);
    }
  }, [board]);

  useEffect(() => {
    checkWinner(board);
  }, [board]);
  return (
    <>
      {computerThinking && (
        <div className="thinking-animation">Computer is thinking…</div>
      )}
      {gameOver && (
        <div className="game-over-container">
          <div className="game-over-inner">
            <div className="game-over-title">Game Over!</div>
            <div className="result">
              {winner === "" ? (
                <>
                  {" "}
                  It's a
                  <span className="result-symbol-stalemate">
                    {" "}
                    Stalemate!{" "}
                  </span>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <span className="result-symbol">{winner}</span> is the Winner!
                </>
              )}
            </div>
            <div className="game-over-button-container">
              <button
                onClick={() => {
                  //reset the game over
                  setGameOver(false);
                  //reset the board
                  setBoard(Array(9).fill(null));
                  //resets the winner
                  setWinner("");
                  //
                  setTurn("X");
                  setUserSymbol("");
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
      {useComputer === true && userSymbol === "" && (
        <div className="symbol-selection-container">
          <div className="symbol-selection-inner">
            <div className="symbol-selection-title">Select your Symbol</div>
            <div className="selection-buttons">
              <button
                onClick={() => {
                  setUserSymbol("X");
                  setComputerSymbol("O");
                }}
              >
                X
              </button>
              <button
                onClick={() => {
                  setUserSymbol("O");
                  setComputerSymbol("X");
                }}
              >
                O
              </button>
            </div>
            <div className="reset-button">
              <button
                onClick={() => {
                  //reset the game over
                  setGameOver(false);
                  //reset the board
                  setBoard(Array(9).fill(null));
                  //resets the winner
                  setWinner("");
                  //
                  setTurn("X");
                  setUseComputer(false);
                  setUserSymbol("");
                }}
              >
                Return
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="tic-tac-toe-container">
        <div className="tic-tac-toe-title">Tic Tac Toe</div>
        <div className="grid-container">
          <div className="tictactoe-grid">
            {board.map((value, index) => (
              <button
                key={index}
                className={`tictactoe-cell tictactoe-cell-${index}`}
                onClick={() => {
                  handleClick(index);
                }}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="computer-selection">
          <button
            onClick={() => {
              setUseComputer(!useComputer);
            }}
          >
            Play against Computer
          </button>
        </div>
      </div>
    </>
  );
};

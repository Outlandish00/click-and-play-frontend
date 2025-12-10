import { useEffect, useState } from "react";
import "./TicTacToe.css";
import { useNavigate } from "react-router-dom";

export const TicTacToe = () => {
  const navigate = useNavigate();
  //creates starting board, an array with 9 empty spaces
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X"); // set turns, X starts the turn by default
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
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
    <div className="tic-tac-toe-container">
      {gameOver && (
        <div className="game-over-container">
          <div className="game-over-inner">
            <div className="game-over-title">Game Over!</div>
            <div className="result">
              {winner === "" ? "It's a Stalemate!" : `${winner} is the Winner!`}
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
      <div className="tic-tac-toe-title">Tic Tac Toe</div>
      <div className="grid-container">
        <div className="tictactoe-grid">
          {board.map((value, index) => (
            <button
              key={index}
              className="tictactoe-cell"
              onClick={() => {
                handleClick(index);
              }}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

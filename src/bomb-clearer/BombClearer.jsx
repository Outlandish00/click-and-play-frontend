import { useEffect, useState } from "react";
import "./BombClearer.css";
import { bombGeneration, printBoard } from "../scripts/bombClearer-scripts";

export const BombClearer = () => {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const newBoard = bombGeneration(Array(64).fill(0));
    setBoard(newBoard);
  }, []);
  return (
    <>
      <div className="bomb-clearer-container"></div>
    </>
  );
};

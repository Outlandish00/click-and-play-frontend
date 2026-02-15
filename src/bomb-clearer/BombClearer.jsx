import { useEffect, useState } from "react";
import "./BombClearer.css";

export const BombClearer = () => {
  const [grid, setGrid] = useState(Array(64).fill(null));
  useEffect(() => {}, []);
  return (
    <>
      <div className="bomb-clearer-container"></div>
    </>
  );
};

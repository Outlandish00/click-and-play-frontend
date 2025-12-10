import { Route, Routes } from "react-router-dom";
import { Home } from "./home/home";
import { TicTacToe } from "./ticTacToe/TicTacToe";

export const ApplicationViews = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tic-tac-toe" element={<TicTacToe />} />
      </Routes>
    </>
  );
};

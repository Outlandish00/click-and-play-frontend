import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { Home } from "./home/home";
import { TicTacToe } from "./ticTacToe/TicTacToe";
import { Navbar } from "./navbar/Navbar";
import { BombClearer } from "./bomb-clearer/BombClearer";

export const ApplicationViews = () => {
  let location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/bomb-clearer" element={<BombClearer />} />
      </Routes>

      {!isHome && <Navbar />}
    </>
  );
};

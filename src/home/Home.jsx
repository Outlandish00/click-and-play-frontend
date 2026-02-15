import { useNavigate } from "react-router-dom";
import "./home.css";
export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-outer-container">
      <div className="home-header-container">
        <span className="click">Click</span>{" "}
        <span className="ampersand">&</span>
        <span className="play">Play</span>
      </div>
      <div className="link-card-container">
        <div
          className="link-card"
          onClick={() => {
            navigate("/tic-tac-toe");
          }}
        >
          <div className="link-title">Tic-Tac-Toe</div>
          <div className="link-body">Just a fun game of tic tac toe lmao</div>
        </div>
        <div className="link-card">
          <div className="link-title">Lorem Ipsums</div>
          <div className="link-body">psumLoremIpsumLoremIpsumLoremIpsum</div>
        </div>
        <div className="link-card">
          <div className="link-title">Lorem Ipsums</div>
          <div className="link-body">mIpsumLoremIpsum</div>
        </div>
        <div className="link-card">
          <div className="link-title">Lorem Ipsums</div>
          <div className="link-body">mLoremIpsumLoremIpsumLoremIpsum</div>
        </div>
        <div className="link-card">
          <div className="link-title">Lorem Ipsums</div>
          <div className="link-body">remIpsumLoremIpsumLoremIpsum</div>
        </div>
        <div className="link-card">
          <div className="link-title">Lorem Ipsums</div>
          <div className="link-body">emIpsumLoremIpsumLoremIpsum</div>
        </div>
      </div>
    </div>
  );
};

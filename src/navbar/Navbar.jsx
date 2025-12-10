import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar-container">
      <div
        className="navbar-button"
        onClick={() => {
          navigate("/");
        }}
      >
        <FontAwesomeIcon icon={faHome} className="navbar-icon" />
      </div>
    </div>
  );
};

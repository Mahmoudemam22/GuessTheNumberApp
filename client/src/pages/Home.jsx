import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaGamepad, FaSignOutAlt } from "react-icons/fa";

export default function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h2>Home</h2>
      <p>Welcome! Ready to play?</p>

      <div className="home-btn-group">
        <button onClick={() => navigate("/game")}>
          <FaGamepad style={{ marginRight: "8px" }} />
          Start Game
        </button>
        <button
          className="logout"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <FaSignOutAlt style={{ marginRight: "8px" }} />
          Logout
        </button>
      </div>
    </div>
  );
}

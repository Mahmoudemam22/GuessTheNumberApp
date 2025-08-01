import { useNavigate } from "react-router-dom";
import { FaGamepad } from "react-icons/fa";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <h1>
        <FaGamepad style={{ marginRight: "8px" }} />
        Welcome to Guess the Number
      </h1>
      <div className="btn-group">
        <button onClick={() => navigate("/login")}>
          <FaSignInAlt style={{ marginRight: "6px" }} />
          Login
        </button>
        <button onClick={() => navigate("/register")}>
          <FaUserPlus style={{ marginRight: "6px" }} />
          Register
        </button>
      </div>
    </div>
  );
}

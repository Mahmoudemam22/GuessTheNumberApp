import { useEffect, useState } from "react";
import { fetchLeaderboard } from "../../api/gameApi";
import { useAuth } from "../../context/AuthContext";
import { FaTrophy, FaExclamationTriangle } from "react-icons/fa";

export default function Leaderboard() {
  const { token } = useAuth();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchLeaderboard(token)
      .then(setScores)
      .catch((err) => console.error("Leaderboard error:", err));
  }, [token]);

  return (
    <div className="leaderboard">
      <h3>
        <FaTrophy
          style={{ marginRight: "8px", fontSize: "1.2em", color: "#d4af37" }}
        />
        Top 5 Best Scores
      </h3>
      {scores.length === 0 ? (
        <p>
          <FaExclamationTriangle
            style={{ marginRight: "6px", color: "#e0a800" }}
          />
          No scores yet or not authorized.
        </p>
      ) : (
        <ol>
          {scores.map((entry, idx) => (
            <li key={idx}>
              {entry.username} - {entry.guesses} guesses
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

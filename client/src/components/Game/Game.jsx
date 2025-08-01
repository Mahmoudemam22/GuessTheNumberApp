import { useCallback, useEffect, useState } from "react";
import { guessNumber, getBestScore } from "../../api/gameApi";
import confetti from "canvas-confetti";
import Leaderboard from "../Leaderboard/Leaderboard";
import { useAuth } from "../../context/AuthContext";
import "./Game.css";
import {
  FaBullseye,
  FaTrophy,
  FaRunning,
  FaRedo,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

export default function Game() {
  const { token } = useAuth();
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [best, setBest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    async function fetchScore() {
      try {
        const res = await getBestScore(token);
        setBest(res?.lowestGuessCount ?? null);
      } catch (err) {
        console.error("Failed to fetch best score", err);
      }
    }

    fetchScore();
  }, [token]);

  const refetchBestScore = useCallback(async () => {
    try {
      const res = await getBestScore(token);
      setBest(res?.lowestGuessCount ?? null);
    } catch (err) {
      console.error("Failed to fetch best score", err);
    }
  }, [token]);

  useEffect(() => {
    refetchBestScore();
  }, [refetchBestScore]);

  const handleGuess = async () => {
    if (!guess) return;

    setLoading(true);
    try {
      const res = await guessNumber(Number(guess), token);
      const isWin = res.message?.toLowerCase().includes("correct");

      if (isWin) {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        setMessage(
          <>
            <FaCheckCircle style={{ marginRight: "6px", color: "green" }} />{" "}
            {res.message}
          </>
        );

        setIsCorrect(true);
        setAttempts(0);
        await refetchBestScore();
      } else {
        setAttempts((prev) => prev + 1);
        setMessage(res.message || "Try again!");
      }
    } catch (err) {
      setMessage(
        <>
          <FaExclamationCircle style={{ marginRight: "6px", color: "red" }} />{" "}
          An error occurred.
        </>
      );
    } finally {
      setLoading(false);
      setGuess("");
    }
  };

  const handlePlayAgain = () => {
    setIsCorrect(false);
    setMessage("");
    setGuess("");
    setAttempts(0);
  };

  return (
    <div className="game-container">
      <h2>
        <FaBullseye style={{ marginRight: "8px" }} />
        Guess the Number (1 - 41)
      </h2>

      <div className="score">
        <span>
          <FaTrophy style={{ marginRight: "6px" }} />
          Best Score: {best ?? "N/A"}
        </span>
        <span>
          <FaRunning style={{ marginRight: "6px" }} />
          Attempts: {attempts}
        </span>
      </div>

      {!isCorrect ? (
        <div className="guess-box">
          <input
            type="number"
            min={1}
            max={41}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess"
            autoFocus
          />
          <button onClick={handleGuess} disabled={!guess || loading}>
            {loading ? (
              <>
                <FaSpinner className="spin" style={{ marginRight: "6px" }} />
                Checking...
              </>
            ) : (
              "Guess"
            )}
          </button>
        </div>
      ) : (
        <button onClick={handlePlayAgain} className="play-again">
          <FaRedo style={{ marginRight: "6px" }} />
          Play Again
        </button>
      )}

      {message && <p className="feedback">{message}</p>}

      <Leaderboard />
    </div>
  );
}

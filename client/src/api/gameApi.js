const API = process.env.REACT_APP_API_URL;

export const guessNumber = async (guess, token) => {
  const res = await fetch(`${API}/api/game/guess`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ guess }),
  });
  return res.json();
};

export const getBestScore = async (token) => {
  const res = await fetch(`${API}/api/game/best`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const fetchLeaderboard = async (token) => {
  const res = await fetch(`${API}/api/game/leaderboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok ? res.json() : [];
};

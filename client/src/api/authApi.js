const API = process.env.REACT_APP_API_URL;

export const register = async (credentials) => {
  try {
    const res = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    return res.ok ? data : { error: data.message };
  } catch {
    return { error: "Network error" };
  }
};

export const login = async (credentials) => {
  try {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    return res.ok ? data : { error: data.message };
  } catch {
    return { error: "Network error" };
  }
};

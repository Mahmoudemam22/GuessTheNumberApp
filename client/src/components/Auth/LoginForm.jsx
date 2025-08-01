import { useState } from "react";
import { login } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaSignInAlt } from "react-icons/fa";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login: setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await login(form);
    if (res.token) {
      setToken(res.token);
      navigate("/home");
    } else {
      setError(res.error || "Login failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit">
        <FaSignInAlt style={{ marginRight: "6px" }} />
        Login
      </button>
      {error && <p className="feedback error">{error}</p>}
    </form>
  );
}

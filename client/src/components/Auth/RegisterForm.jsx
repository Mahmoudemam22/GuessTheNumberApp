import { useState } from "react";
import { register } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

export default function RegisterForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (res.message === "User registered") {
      navigate("/login");
    } else {
      setError(res.error || "Registration failed.");
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
        <FaUserPlus style={{ marginRight: "6px" }} />
        Register
      </button>
      {error && <p className="feedback error">{error}</p>}
    </form>
  );
}

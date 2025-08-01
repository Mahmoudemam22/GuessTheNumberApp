import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import GamePage from "../pages/GamePage";
import { useAuth } from "../context/AuthContext";

export default function AppRouter() {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/game"
          element={token ? <GamePage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

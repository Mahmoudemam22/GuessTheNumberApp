import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import "./styles/global.css";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

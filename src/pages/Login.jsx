import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/apiAuth";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // 🔥 NEW

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // reset

    try {
      setLoading(true);

      await login({ email, password });

      navigate("/dashboard");
    } catch (err) {
      setError("❌ Email veya şifre hatalı!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="logo">🏝️ Wild Oasis</h1>
        <p className="subtitle">Admin Panel Login</p>

        {/* 🔥 ERROR MESSAGE */}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit} className="form">
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

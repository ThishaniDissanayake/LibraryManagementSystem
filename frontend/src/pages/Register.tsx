import { useState } from "react";
import { registerUser } from "../services/authService";
import "./Auth.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser({
        username,
        email,
        passwordHash: password
      });

      window.location.href = "/";
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>
          <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
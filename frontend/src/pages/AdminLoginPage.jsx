import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "admin@portfolio.dev", password: "Admin@123" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login(form);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Backend connection check karo aur server restart karo."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-auth-shell">
      <form className="glass-card admin-auth-card" onSubmit={handleSubmit}>
        <span className="eyebrow">Admin Access</span>
        <h2>Portfolio Control Room</h2>
        <p>Sign in to manage profile content, featured work, section visibility, and uploads.</p>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({ ...current, password: event.target.value }))
            }
          />
        </label>
        <button className="primary-button" type="submit" disabled={loading}>
          <LockKeyhole size={16} />
          {loading ? "Signing In..." : "Sign In"}
        </button>
        {error && <p className="status-message error">{error}</p>}
      </form>
    </main>
  );
}

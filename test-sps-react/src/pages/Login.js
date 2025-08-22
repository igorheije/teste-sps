import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (result.success) {
      navigate("/", { replace: true });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#333",
          }}
        >
          Login
        </h1>

        {error && (
          <div
            style={{
              backgroundColor: "#ffebee",
              color: "#c62828",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
              placeholder="admin@sps.com"
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Senha:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
              placeholder="admin123"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: loading ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "14px",
            color: "#666",
          }}
        >
          <p>
            <strong>Credenciais de teste:</strong>
          </p>
          <p>Email: admin@sps.com</p>
          <p>Senha: admin123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;

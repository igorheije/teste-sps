import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <header
        style={{
          backgroundColor: "#333",
          color: "white",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <h1 style={{ margin: 0, fontSize: "24px" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              SPS React Test
            </Link>
          </h1>

          <nav style={{ display: "flex", gap: "15px" }}>
            <Link
              to="/users"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: "4px",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#555")}
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Usuários
            </Link>
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "14px", color: "#ccc" }}>{user?.name}</div>
            <div style={{ fontSize: "12px", color: "#999" }}>
              {user?.role === "admin" ? "Administrador" : "Usuário"}
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Sair
          </button>
        </div>
      </header>

      <main style={{ padding: "20px" }}>{children}</main>
    </div>
  );
}

export default Layout;

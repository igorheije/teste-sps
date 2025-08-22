import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Layout.css";

function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="layout-header-left">
          <h1 className="layout-title">
            <Link to="/" className="layout-title-link">
              SPS React Test
            </Link>
          </h1>

          <nav className="layout-nav">
            <Link to="/users" className="layout-nav-link">
              Usuários
            </Link>
          </nav>
        </div>

        <div className="layout-header-right">
          <div className="layout-user-info">
            <div className="layout-user-name">{user?.name}</div>
            <div className="layout-user-role">
              {user?.role === "admin" ? "Administrador" : "Usuário"}
            </div>
          </div>

          <button onClick={handleLogout} className="layout-logout-button">
            Sair
          </button>
        </div>
      </header>

      <main className="layout-main">{children}</main>
    </div>
  );
}

export default Layout;

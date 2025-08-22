import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Layout from "../components/Layout";
import "./Home.css";

function Home() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated()) {
    return (
      <div className="home-unauthorized">
        <h1 className="home-unauthorized-title">SPS REACT TEST</h1>
        <p className="home-unauthorized-text">
          Faça login para acessar o sistema
        </p>
        <Link to="/login" className="home-unauthorized-link">
          Fazer Login
        </Link>
      </div>
    );
  }

  return (
    <Layout>
      <div className="home-container">
        <h1 className="home-title">Bem-vindo ao SPS React Test</h1>

        <div className="home-welcome">
          <p className="home-welcome-text">
            Olá, <strong>{user?.name}</strong>!
          </p>
          <p className="home-welcome-role">
            Você está logado como:{" "}
            <strong>
              {user?.role === "admin" ? "Administrador" : "Usuário"}
            </strong>
          </p>
        </div>

        <div className="home-actions">
          <Link to="/users" className="home-action-link">
            Gerenciar Usuários
          </Link>

          <Link to={`/users/${user?.id}`} className="home-action-link profile">
            Meu Perfil
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Home;

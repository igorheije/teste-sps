import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Layout from "../components/Layout";

function Home() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated()) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          flexDirection: "column",
          gap: "20px",
          border: "0px",
          margin: "0px",
          padding: "0px",
        }}
      >
        <h1 style={{ color: "#333", margin: 0 }}>SPS REACT TEST</h1>
        <p style={{ color: "#666", fontSize: "18px" }}>
          Faça login para acessar o sistema
        </p>
        <Link
          to="/login"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "12px 24px",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          Fazer Login
        </Link>
      </div>
    );
  }

  return (
    <Layout>
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ color: "#333", marginBottom: "20px" }}>
          Bem-vindo ao SPS React Test
        </h1>

        <div style={{ marginBottom: "30px" }}>
          <p style={{ fontSize: "16px", color: "#666", marginBottom: "10px" }}>
            Olá, <strong>{user?.name}</strong>!
          </p>
          <p style={{ fontSize: "14px", color: "#999" }}>
            Você está logado como:{" "}
            <strong>
              {user?.role === "admin" ? "Administrador" : "Usuário"}
            </strong>
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/users"
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "12px 20px",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            Gerenciar Usuários
          </Link>

          <Link
            to={`/users/${user?.id}`}
            style={{
              backgroundColor: "#17a2b8",
              color: "white",
              padding: "12px 20px",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            Meu Perfil
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Home;

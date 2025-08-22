import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { get } from "../services/UserService";
import { update } from "../services/UserService";

function UserEdit() {
  const { user: currentUser } = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await get(userId);
        setUser(response.user);
      } catch (error) {
        setError("Erro ao carregar usuário");
      } finally {
        setInitialLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const updateData = {
        name: user.name,
        email: user.email,
      };

      await update(user.id, updateData);
      setSuccess("Usuário atualizado com sucesso!");

      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (initialLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
        }}
      >
        Carregando...
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ color: "#333", marginBottom: "30px" }}>Erro</h1>
        <div
          style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "15px",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ color: "#333", marginBottom: "30px" }}>
        {currentUser?.id === parseInt(userId) ? "Meu Perfil" : "Editar Usuário"}
      </h1>

      {error && (
        <div
          style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "15px",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            backgroundColor: "#e8f5e8",
            color: "#2e7d32",
            padding: "15px",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Nome:
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Perfil:
          </label>
          <div
            style={{
              padding: "12px",
              backgroundColor: "#f8f9fa",
              border: "1px solid #ddd",
              borderRadius: "4px",
              color: "#666",
            }}
          >
            {user.role === "admin" ? "Administrador" : "Usuário"}
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Data de Criação:
          </label>
          <div
            style={{
              padding: "12px",
              backgroundColor: "#f8f9fa",
              border: "1px solid #ddd",
              borderRadius: "4px",
              color: "#666",
            }}
          >
            {new Date(user.createdAt).toLocaleDateString("pt-BR")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/users")}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserEdit;

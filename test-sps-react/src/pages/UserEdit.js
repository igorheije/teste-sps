import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { get } from "../services/UserService";
import { update } from "../services/UserService";
import "./UserEdit.css";

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
    return <div className="user-edit-loading">Carregando...</div>;
  }

  if (!user) {
    return (
      <div className="user-edit-container">
        <h1 className="user-edit-title">Erro</h1>
        <div className="user-edit-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="user-edit-container">
      <h1 className="user-edit-title">
        {currentUser?.id === parseInt(userId) ? "Meu Perfil" : "Editar Usuário"}
      </h1>

      {error && <div className="user-edit-error">{error}</div>}

      {success && <div className="user-edit-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="user-edit-form-group">
          <label className="user-edit-label">Nome:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
            className="user-edit-input"
          />
        </div>

        <div className="user-edit-form-group">
          <label className="user-edit-label">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className="user-edit-input"
          />
        </div>

        <div className="user-edit-form-group">
          <label className="user-edit-label">Perfil:</label>
          <div className="user-edit-display-field">
            {user.role === "admin" ? "Administrador" : "Usuário"}
          </div>
        </div>

        <div className="user-edit-form-group">
          <label className="user-edit-label">Data de Criação:</label>
          <div className="user-edit-display-field">
            {new Date(user.createdAt).toLocaleDateString("pt-BR")}
          </div>
        </div>

        <div className="user-edit-actions">
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="user-edit-cancel-button"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="user-edit-save-button"
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserEdit;

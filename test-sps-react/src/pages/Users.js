import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { list, create, deleteUser } from "../services/UserService";
import { useAuth } from "../contexts/AuthContext";
import "./Users.css";

function Users() {
  const { isAdmin, user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await list();
      setUsers(response.users || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      await create(newUser);
      setNewUser({ name: "", email: "", password: "", role: "user" });
      setShowCreateForm(false);
      loadUsers();
    } catch (error) {
      setError(error.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (
      window.confirm(`Tem certeza que deseja excluir o usuário "${userName}"?`)
    ) {
      try {
        await deleteUser(userId);
        loadUsers();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="users-loading">
        <h2>Carregando usuários...</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="users-header">
        <h1 className="users-title">Gerenciar Usuários</h1>
        {isAdmin() && (
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="users-create-button"
          >
            {showCreateForm ? "Cancelar" : "Novo Usuário"}
          </button>
        )}
      </div>

      {error && <div className="users-error">{error}</div>}

      {showCreateForm && isAdmin() && (
        <div className="users-create-form">
          <h3 className="users-create-title">Criar Novo Usuário</h3>
          <form onSubmit={handleCreateUser}>
            <div className="users-form-grid">
              <div className="users-form-group">
                <label className="users-label">Nome:</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  required
                  className="users-input"
                />
              </div>
              <div className="users-form-group">
                <label className="users-label">Email:</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                  className="users-input"
                />
              </div>
              <div className="users-form-group">
                <label className="users-label">Senha:</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  required
                  className="users-input"
                />
              </div>
              <div className="users-form-group">
                <label className="users-label">Perfil:</label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="users-select"
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={creating}
              className="users-submit-button"
            >
              {creating ? "Criando..." : "Criar Usuário"}
            </button>
          </form>
        </div>
      )}

      <div className="users-table-container">
        <table className="users-table">
          <thead className="users-table-header">
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Perfil</th>
              <th>Data de Criação</th>
              <th className="actions">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="users-table-row">
                <td className="users-table-cell">{user.name}</td>
                <td className="users-table-cell">{user.email}</td>
                <td className="users-table-cell">
                  <span
                    className={`users-role-badge ${
                      user.role === "admin" ? "admin" : ""
                    }`}
                  >
                    {user.role === "admin" ? "Admin" : "Usuário"}
                  </span>
                </td>
                <td className="users-table-cell">
                  {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                </td>
                <td className="users-table-cell actions">
                  <div className="users-actions">
                    {(isAdmin() || user.id === currentUser.id) && (
                      <Link
                        to={`/users/${user.id}`}
                        className="users-edit-link"
                      >
                        Editar
                      </Link>
                    )}
                    {isAdmin() && (
                      <button
                        onClick={() => handleDeleteUser(user.id, user.name)}
                        className="users-delete-button"
                      >
                        Excluir
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="users-empty">Nenhum usuário encontrado.</div>
        )}
      </div>
    </div>
  );
}

export default Users;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { list, create, deleteUser } from "../services/UserService";
import { useAuth } from "../contexts/AuthContext";

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
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Carregando usuários...</h2>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ margin: 0, color: "#333" }}>Gerenciar Usuários</h1>
        {isAdmin() && (
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {showCreateForm ? "Cancelar" : "Novo Usuário"}
          </button>
        )}
      </div>

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

      {showCreateForm && isAdmin() && (
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: "20px" }}>
            Criar Novo Usuário
          </h3>
          <form onSubmit={handleCreateUser}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Nome:
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Email:
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Senha:
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Perfil:
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                >
                  <option value="user">Usuário</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={creating}
              style={{
                backgroundColor: creating ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "4px",
                cursor: creating ? "not-allowed" : "pointer",
                fontWeight: "bold",
              }}
            >
              {creating ? "Criando..." : "Criar Usuário"}
            </button>
          </form>
        </div>
      )}

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                Nome
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                Perfil
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "left",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                Data de Criação
              </th>
              <th
                style={{
                  padding: "15px",
                  textAlign: "center",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                <td style={{ padding: "15px" }}>{user.name}</td>
                <td style={{ padding: "15px" }}>{user.email}</td>
                <td style={{ padding: "15px" }}>
                  <span
                    style={{
                      backgroundColor:
                        user.role === "admin" ? "#dc3545" : "#28a745",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {user.role === "admin" ? "Admin" : "Usuário"}
                  </span>
                </td>
                <td style={{ padding: "15px" }}>
                  {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                </td>
                <td style={{ padding: "15px", textAlign: "center" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    {(isAdmin() || user.id === currentUser.id) && (
                      <Link
                        to={`/users/${user.id}`}
                        style={{
                          backgroundColor: "#17a2b8",
                          color: "white",
                          padding: "6px 12px",
                          textDecoration: "none",
                          borderRadius: "4px",
                          fontSize: "14px",
                        }}
                      >
                        Editar
                      </Link>
                    )}
                    {isAdmin() && (
                      <button
                        onClick={() => handleDeleteUser(user.id, user.name)}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
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
          <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
            Nenhum usuário encontrado.
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;

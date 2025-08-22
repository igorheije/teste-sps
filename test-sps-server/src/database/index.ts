import bcrypt from "bcryptjs";
import sqlite3 from "sqlite3";
import { User, CreateUserRequest, UpdateUserRequest } from "../types";

const dbPath = "./database.sqlite";
let db: sqlite3.Database;

export const initializeDatabase = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Erro ao conectar com o banco de dados:", err);
        reject(err);
        return;
      }
      console.log("Conectado ao banco de dados SQLite");

      db.run(
        `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'user',
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `,
        (err) => {
          if (err) {
            console.error("Erro ao criar tabela:", err);
            reject(err);
            return;
          }

          db.get(
            "SELECT COUNT(*) as count FROM users WHERE role = 'admin'",
            (err, row: any) => {
              if (err) {
                console.error("Erro ao verificar usuários admin:", err);
                reject(err);
                return;
              }

              if (row.count === 0) {
                const hashedPassword = bcrypt.hashSync("admin123", 10);
                db.run(
                  `
              INSERT INTO users (name, email, password, role, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
            `,
                  ["Administrador", "admin@sps.com", hashedPassword, "admin"],
                  (err) => {
                    if (err) {
                      console.error("Erro ao criar usuário admin:", err);
                      reject(err);
                      return;
                    }
                    console.log("Database initialized with admin user");
                    resolve();
                  }
                );
              } else {
                console.log("Database already initialized");
                resolve();
              }
            }
          );
        }
      );
    });
  });
};

export const createUser = async (
  userData: CreateUserRequest
): Promise<Omit<User, "password">> => {
  return new Promise((resolve, reject) => {
    const hashedPassword = bcrypt.hashSync(userData.password, 10);

    db.run(
      `
      INSERT INTO users (name, email, password, role, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
    `,
      [userData.name, userData.email, hashedPassword, userData.role || "user"],
      function (err) {
        if (err) {
          reject(err);
          return;
        }

        db.get(
          "SELECT * FROM users WHERE id = ?",
          [this.lastID],
          (err, row: any) => {
            if (err) {
              reject(err);
              return;
            }

            const { password, ...userWithoutPassword } = row;
            resolve(userWithoutPassword);
          }
        );
      }
    );
  });
};

export const findUserByEmail = (email: string): Promise<User | undefined> => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
};

export const findUserById = (
  id: string
): Promise<Omit<User, "password"> | null> => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row: any) => {
      if (err) {
        reject(err);
        return;
      }

      if (!row) {
        resolve(null);
        return;
      }

      const { password, ...userWithoutPassword } = row;
      resolve(userWithoutPassword);
    });
  });
};

export const getAllUsers = (): Promise<Omit<User, "password">[]> => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT id, name, email, role, createdAt, updatedAt FROM users",
      (err, rows: any[]) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      }
    );
  });
};

export const updateUser = async (
  id: string,
  userData: UpdateUserRequest
): Promise<Omit<User, "password"> | null> => {
  return new Promise((resolve, reject) => {
    const updates: string[] = [];
    const values: any[] = [];

    if (userData.name) {
      updates.push("name = ?");
      values.push(userData.name);
    }
    if (userData.email) {
      updates.push("email = ?");
      values.push(userData.email);
    }
    if (userData.password) {
      updates.push("password = ?");
      values.push(bcrypt.hashSync(userData.password, 10));
    }
    if (userData.role) {
      updates.push("role = ?");
      values.push(userData.role);
    }

    updates.push("updatedAt = datetime('now')");
    values.push(id);

    const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;

    db.run(query, values, function (err) {
      if (err) {
        reject(err);
        return;
      }

      if (this.changes === 0) {
        resolve(null);
        return;
      }

      db.get(
        "SELECT id, name, email, role, createdAt, updatedAt FROM users WHERE id = ?",
        [id],
        (err, row: any) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(row);
        }
      );
    });
  });
};

export const deleteUser = (id: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.changes > 0);
    });
  });
};

export const checkEmailExists = (
  email: string,
  excludeId?: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    let query = "SELECT COUNT(*) as count FROM users WHERE email = ?";
    let params = [email];

    if (excludeId) {
      query += " AND id != ?";
      params.push(excludeId);
    }

    db.get(query, params, (err, row: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row.count > 0);
    });
  });
};

export const closeDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        console.log("Conexão com o banco de dados fechada");
        resolve();
      });
    } else {
      resolve();
    }
  });
};

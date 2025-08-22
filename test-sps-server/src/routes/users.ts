import { Router, Request, Response } from "express";
import { authenticateToken, requireAdmin } from "../middleware/auth";
import {
  createUser,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  checkEmailExists,
} from "../database";
import {
  AuthRequest,
  AuthRequestWithParams,
  CreateUserRequest,
  UpdateUserRequest,
} from "../types";

const router = Router();

router.use(authenticateToken);

// Rota para obter dados do usuário logado
router.get("/me", async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const user = await findUserById(userId);

    if (!user) {
      res.status(404).json({
        error: "Usuário não encontrado",
        message: "Usuário não foi encontrado no sistema",
      });
      return;
    }

    res.json({
      message: "Dados do usuário retornados com sucesso",
      user,
    });
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    res.status(500).json({
      error: "Erro interno do servidor",
      message: "Ocorreu um erro ao buscar os dados do usuário",
    });
  }
});

router.post(
  "/",
  requireAdmin,
  async (req: Request<{}, {}, CreateUserRequest>, res: Response) => {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({
          error: "Campos obrigatórios",
          message: "Nome, email e senha são obrigatórios",
        });
        return;
      }

      if (await checkEmailExists(email)) {
        res.status(409).json({
          error: "Email já existe",
          message: "Já existe um usuário cadastrado com este email",
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          error: "Email inválido",
          message: "Formato de email inválido",
        });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({
          error: "Senha muito curta",
          message: "A senha deve ter pelo menos 6 caracteres",
        });
        return;
      }

      const newUser = await createUser({
        name,
        email,
        password,
        role: role || "user",
      });

      res.status(201).json({
        message: "Usuário criado com sucesso",
        user: newUser,
      });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({
        error: "Erro interno do servidor",
        message: "Ocorreu um erro ao criar o usuário",
      });
    }
  }
);

router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    res.json({
      message: "Usuários listados com sucesso",
      users,
      total: users.length,
    });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({
      error: "Erro interno do servidor",
      message: "Ocorreu um erro ao listar os usuários",
    });
  }
});

router.get(
  "/:id",
  async (req: AuthRequestWithParams<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      const user = await findUserById(id);

      if (!user) {
        res.status(404).json({
          error: "Usuário não encontrado",
          message: "Usuário com o ID especificado não foi encontrado",
        });
        return;
      }

      if (req.user!.role !== "admin" && req.user!.id !== id) {
        res.status(403).json({
          error: "Acesso negado",
          message: "Você só pode visualizar seu próprio perfil",
        });
        return;
      }

      res.json({
        message: "Usuário encontrado com sucesso",
        user,
      });
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({
        error: "Erro interno do servidor",
        message: "Ocorreu um erro ao buscar o usuário",
      });
    }
  }
);

router.put(
  "/:id",
  async (
    req: AuthRequestWithParams<{ id: string }> & { body: UpdateUserRequest },
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const { name, email, password, role } = req.body;

      const existingUser = await findUserById(id);
      if (!existingUser) {
        res.status(404).json({
          error: "Usuário não encontrado",
          message: "Usuário com o ID especificado não foi encontrado",
        });
        return;
      }

      if (req.user!.role !== "admin" && req.user!.id !== id) {
        res.status(403).json({
          error: "Acesso negado",
          message: "Você só pode editar seu próprio perfil",
        });
        return;
      }

      if (role && req.user!.role !== "admin") {
        res.status(403).json({
          error: "Acesso negado",
          message: "Apenas administradores podem alterar o papel do usuário",
        });
        return;
      }

      if (email && (await checkEmailExists(email, id))) {
        res.status(409).json({
          error: "Email já existe",
          message: "Já existe um usuário cadastrado com este email",
        });
        return;
      }

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          res.status(400).json({
            error: "Email inválido",
            message: "Formato de email inválido",
          });
          return;
        }
      }

      if (password && password.length < 6) {
        res.status(400).json({
          error: "Senha muito curta",
          message: "A senha deve ter pelo menos 6 caracteres",
        });
        return;
      }

      const updatedUser = await updateUser(id, { name, email, password, role });

      res.json({
        message: "Usuário atualizado com sucesso",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({
        error: "Erro interno do servidor",
        message: "Ocorreu um erro ao atualizar o usuário",
      });
    }
  }
);

router.delete(
  "/:id",
  requireAdmin,
  async (req: AuthRequestWithParams<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;

      const existingUser = await findUserById(id);
      if (!existingUser) {
        res.status(404).json({
          error: "Usuário não encontrado",
          message: "Usuário com o ID especificado não foi encontrado",
        });
        return;
      }

      if (req.user!.id === id) {
        res.status(400).json({
          error: "Operação inválida",
          message: "Não é possível excluir seu próprio usuário",
        });
        return;
      }

      const deleted = await deleteUser(id);

      if (deleted) {
        res.json({
          message: "Usuário excluído com sucesso",
        });
      } else {
        res.status(500).json({
          error: "Erro ao excluir usuário",
          message: "Não foi possível excluir o usuário",
        });
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      res.status(500).json({
        error: "Erro interno do servidor",
        message: "Ocorreu um erro ao excluir o usuário",
      });
    }
  }
);

export default router;

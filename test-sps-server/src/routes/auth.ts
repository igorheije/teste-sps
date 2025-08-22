import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/auth";
import { findUserByEmail } from "../database";
import { LoginRequest, LoginResponse } from "../types";

const router = Router();

router.post("/login", async (req: Request<{}, {}, LoginRequest>, res: Response<LoginResponse | { error: string; message: string }>) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        error: "Campos obrigatórios",
        message: "Email e senha são obrigatórios",
      });
      return;
    }

    const user = findUserByEmail(email);
    if (!user) {
      res.status(401).json({
        error: "Credenciais inválidas",
        message: "Email ou senha incorretos",
      });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({
        error: "Credenciais inválidas",
        message: "Email ou senha incorretos",
      });
      return;
    }

    const token = generateToken(user);

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.json({
      message: "Login realizado com sucesso",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({
      error: "Erro interno do servidor",
      message: "Ocorreu um erro durante o login",
    });
  }
});

export default router;

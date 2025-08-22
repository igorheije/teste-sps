import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { User, AuthRequest } from "../types";

const JWT_SECRET: string = process.env.JWT_SECRET || "1234567890";

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      error: "Token de acesso necessário",
      message: "Token não fornecido no header Authorization",
    });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({
        error: "Token inválido",
        message: "Token expirado ou inválido",
      });
      return;
    }

    req.user = decoded as User;
    next();
  });
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({
      error: "Acesso negado",
      message: "Apenas administradores podem acessar este recurso",
    });
    return;
  }
  next();
};

export const generateToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
};

export { JWT_SECRET };

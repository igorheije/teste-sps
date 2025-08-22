import { Router } from "express";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);

export default routes;

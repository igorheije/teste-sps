import express, { Application } from "express";
import routes from "./routes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger";
import { initializeDatabase } from "./database";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerSpecs));

app.use(routes);

const startServer = async (): Promise<void> => {
  try {
    await initializeDatabase();

    const port: number = parseInt(process.env.PORT || "3001", 10);
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
      console.log(`Documentação Swagger: http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error("Erro ao inicializar o servidor:", error);
    process.exit(1);
  }
};

startServer();

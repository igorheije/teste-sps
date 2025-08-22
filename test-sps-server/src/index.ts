import express, { Application, RequestHandler } from "express";
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
const swaggerServe: RequestHandler[] =
  swaggerUi.serve as unknown as RequestHandler[];
const swaggerSetup: RequestHandler = swaggerUi.setup(
  swaggerSpecs
) as unknown as RequestHandler;

app.use("/api-docs", ...swaggerServe, swaggerSetup);

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

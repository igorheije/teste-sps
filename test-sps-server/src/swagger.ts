import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API SPS - Sistema de Gerenciamento de Usuários",
      version: "1.0.0",
      description:
        "API RESTful para gerenciamento de usuários com autenticação JWT e banco de dados em memória.",
      contact: {
        name: "SPS Team",
        email: "admin@sps.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Servidor de Desenvolvimento",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Token JWT obtido através do endpoint de login",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/docs/*.ts", "./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export default specs;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do usuário
 *           example: "1"
 *         name:
 *           type: string
 *           description: Nome completo do usuário
 *           example: João Silva
 *         email:
 *           type: string
 *           format: email
 *           description: Email único do usuário
 *           example: joao@example.com
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           description: Papel do usuário no sistema
 *           example: user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do usuário
 *           example: 2024-01-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 *           example: 2024-01-01T00:00:00.000Z
 *       required:
 *         - id
 *         - name
 *         - email
 *         - role
 *         - createdAt
 *         - updatedAt
 *     
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Tipo do erro
 *           example: Campos obrigatórios
 *         message:
 *           type: string
 *           description: Descrição detalhada do erro
 *           example: Nome, email e senha são obrigatórios
 *     
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensagem de sucesso
 *           example: Operação realizada com sucesso
 */

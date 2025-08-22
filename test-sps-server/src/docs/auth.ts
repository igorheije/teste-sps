/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: admin@sps.com
 *         password:
 *           type: string
 *           description: Senha do usuário
 *           example: admin123
 *       required:
 *         - email
 *         - password
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Login realizado com sucesso
 *         user:
 *           $ref: '#/components/schemas/User'
 *         token:
 *           type: string
 *           description: Token JWT para autenticação
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login e retorna token JWT
 *     description: Autentica um usuário com email e senha, retornando um token JWT válido por 24 horas
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             admin:
 *               summary: Login como administrador
 *               value:
 *                 email: admin@sps.com
 *                 password: admin123
 *             user:
 *               summary: Login como usuário comum
 *               value:
 *                 email: joao@example.com
 *                 password: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             examples:
 *               success:
 *                 summary: Resposta de sucesso
 *                 value:
 *                   message: Login realizado com sucesso
 *                   user:
 *                     id: 1
 *                     name: Administrador
 *                     email: admin@sps.com
 *                     role: admin
 *                     createdAt: 2024-01-01T00:00:00.000Z
 *                     updatedAt: 2024-01-01T00:00:00.000Z
 *                   token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Campos obrigatórios não fornecidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Campos obrigatórios
 *               message: Email e senha são obrigatórios
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Credenciais inválidas
 *               message: Email ou senha incorretos
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: Erro interno do servidor
 *               message: Ocorreu um erro durante o login
 */

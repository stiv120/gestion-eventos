const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const userController = require("../controllers/user-controller");
const {
  validateUserCreation,
  validateUserUpdate,
} = require("../middleware/user-middleware");

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene la lista de usuarios
 *     description: Retorna la lista de usuarios disponibles
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error al cargar los usuarios
 */
router.get("/users", userController.getAll);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene el usuario por id
 *     description: Retorna el usuario por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Obtiene el usuario por id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener el usuario
 */
router.get("/users/:id", userController.getById);
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Retorna el usuario creado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: "Prueba"
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *                 example: "prueba@gmail.com"
 *     responses:
 *       200:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error al crear el usuario
 */
router.post(
  "/users",
  validateUserCreation,
  authMiddleware,
  userController.create
);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario
 *     description: Retorna si el usuario fue actualizado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: "Prueba stiven"
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *                 example: "prueba@gmail.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error de petición
 *       500:
 *         description: Error al actualizar el usuario
 */
router.put(
  "/users/:id",
  validateUserUpdate,
  authMiddleware,
  userController.update
);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     description: Retorna si el usuario fue eliminado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     content:
 *      application/json:
 *      schema:
 *        type: array
 *     responses:
 *       200:
 *         description: usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar el usuario
 */
router.delete("/users/:id", authMiddleware, userController.delete);

module.exports = router;

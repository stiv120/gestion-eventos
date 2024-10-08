const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const attendeeController = require("../controllers/attendee-controller");
const {
  validateAttendeeCreation,
  validateAttendeeUpdate,
} = require("../middleware/attendee-middleware");

/**
 * @swagger
 * /api/attendees:
 *   get:
 *     summary: Obtiene la lista de asistentes
 *     description: Retorna la lista de asistentes disponibles
 *     responses:
 *       200:
 *         description: Lista de asistentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attendee'
 *       500:
 *         description: Error al cargar los asistentes
 */
router.get("/attendees", attendeeController.getAll);
/**
 * @swagger
 * /api/attendees/{id}:
 *   get:
 *     summary: Obtiene el asistente por id
 *     description: Retorna el asistente por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Obtiene el asistente por id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attendee'
 *       404:
 *         description: Asistente no encontrado
 *       500:
 *         description: Error al obtener el asistente
 */
router.get("/attendees/:id", attendeeController.getById);
/**
 * @swagger
 * /api/attendees:
 *   post:
 *     summary: Crea un nuevo asistente
 *     description: Retorna el asistente creado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: Id del asistente
 *                 example: "1"
 *               event_id:
 *                 type: string
 *                 description: Id del evento
 *                 example: "1"
 *     responses:
 *       200:
 *         description: Asistente creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error al crear el asistente
 */
router.post(
  "/attendees",
  validateAttendeeCreation,
  authMiddleware,
  attendeeController.create
);
/**
 * @swagger
 * /api/attendees/{id}:
 *   put:
 *     summary: Actualiza un asistente
 *     description: Retorna si el asistente fue actualizado
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
 *               user_id:
 *                 type: string
 *                 description: Id del asistente
 *                 example: "1"
 *               event_id:
 *                 type: string
 *                 description: Id del evento
 *                 example: "1"
 *     responses:
 *       200:
 *         description: Asistente actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendee'
 *       400:
 *         description: Error de petición
 *       500:
 *         description: Error al actualizar el asistente
 */
router.put(
  "/attendees/:id",
  validateAttendeeUpdate,
  authMiddleware,
  attendeeController.update
);
/**
 * @swagger
 * /api/attendees/{id}:
 *   delete:
 *     summary: Elimina un asistente
 *     description: Retorna si el asistente fue eliminado
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
 *         description: Asistente eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendee'
 *       404:
 *         description: Asistente no encontrado
 *       500:
 *         description: Error al eliminar el asistente
 */
router.delete("/attendees/:id", authMiddleware, attendeeController.delete);

module.exports = router;

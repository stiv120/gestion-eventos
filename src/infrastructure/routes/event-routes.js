const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload-events");
const authMiddleware = require("../middleware/auth-middleware");
const eventController = require("../controllers/event-controller");
const {
  validateEventCreation,
  validateEventUpdate,
} = require("../middleware/event-middleware");

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Obtiene la lista de eventos
 *     description: Retorna la lista de eventos disponibles
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Error al cargar los eventos
 */
router.get("/events", eventController.getAll);
/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Obtiene el evento por id
 *     description: Retorna el evento por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Obtiene el evento por id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error al obtener el evento
 */
router.get("/events/:id", eventController.getById);
/**
 * @swagger
 * /api/events-attendees:
 *   get:
 *     summary: Obtiene la lista de asistentes a eventos por día de la semana
 *     description: Retorna la lista de asistentes a eventos por día de la semana
 *     responses:
 *       200:
 *         description: Lista de asistentes a eventos por día de la semana
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Error al cargar los asistentes de los eventos.
 */
router.get("/events-attendees", eventController.getAttendees);
/**
 * @swagger
 * /api/events-nearby-locations:
 *   get:
 *     summary: Obtiene una lista de ubicaciones cercanas a los eventos
 *     description: Retorna una lista de ubicaciones cercanas a los eventos
 *     requestBody:
 *       description: Event data
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Lista de ubicaciones cercanas a los eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Error al cargar las ubicaciones cercanas de los eventos.
 */
router.get("/events-nearby-locations", eventController.getNearbyLocations);
/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Crea un nuevo evento
 *     description: Retorna el evento creado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del evento
 *                 example: "Conferencia de Tecnología"
 *               description:
 *                 type: string
 *                 description: Descripción del evento
 *                 example: "Evento sobre las últimas tendencias tecnológicas"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora del evento
 *                 example: "2024-09-30 19:40:00"
 *               location:
 *                 type: string
 *                 description: Ubicación del evento
 *                 example: "Cali, Colombia"
 *     responses:
 *       200:
 *         description: Evento creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       500:
 *         description: Error al crear el evento
 */
router.post(
  "/events",
  validateEventCreation,
  authMiddleware,
  eventController.create
);
/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Actualiza un evento
 *     description: Retorna si el evento fue actualizado
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
 *               description:
 *                 type: string
 *                 description: Descripción del evento
 *                 example: "Evento sobre las últimas tendencias tecnológicas"
 *               location:
 *                 type: string
 *                 description: Ubicación del evento
 *                 example: "Cali, Colombia"
 *     responses:
 *       200:
 *         description: Evento actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Error de petición
 *       500:
 *         description: Error al actualizar el evento
 */
router.put(
  "/events/:id",
  validateEventUpdate,
  authMiddleware,
  eventController.update
);
/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Elimina un evento
 *     description: Retorna si el evento fue eliminado
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
 *         description: Evento eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event no encontrado
 *       500:
 *         description: Error al eliminar el evento
 */
router.delete("/events/:id", authMiddleware, eventController.delete);
/**
 * @swagger
 * /api/events-upload:
 *   post:
 *     summary: Carga y procesa el archivo excel con los eventos
 *     description: Retorna la respuesta si insertó o actualizó los eventos cargados del excel.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo Excel a cargar
 *                 example: example.xlsx
 *     responses:
 *       200:
 *         description: Eventos correctamente guardados y actualizados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       500:
 *         description: Error al procesar el archivo.
 */
router.post(
  "/events-upload",
  upload.single("file"),
  eventController.uploadEvents
);

module.exports = router;

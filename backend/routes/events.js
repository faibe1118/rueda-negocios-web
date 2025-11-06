const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { verificarToken } = require("../middleware/authMiddleware");

// Crear evento (requiere autenticación)
router.post("/", verificarToken, eventController.createEvent);

// Obtener todos los eventos
router.get("/", eventController.getEvents);

// Obtener evento por ID
router.get("/:id", eventController.getEventById);

// Actualizar estado del evento (solo moderadores)
router.patch("/:id/estado", verificarToken, eventController.updateEventStatus);

// Eliminar evento
router.delete("/:id", verificarToken, eventController.deleteEvent);

module.exports = router;


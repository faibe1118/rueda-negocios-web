const express = require("express");
const router = express.Router();
const moderatorController = require("../controllers/moderatorController");
const { verificarToken } = require("../middleware/authMiddleware");

// Crear PQRS (cualquier usuario autenticado)
router.post("/", verificarToken, moderatorController.createPQRS);

// Obtener PQRS del usuario actual
router.get("/mis-pqrs", verificarToken, async (req, res) => {
    try {
        const PQRS = require("../models/PQRS");
        const pqrsList = await PQRS.find({ usuario: req.user._id })
            .populate("moderador", "nombreEmpresa email")
            .sort({ createdAt: -1 });
        res.json(pqrsList);
    } catch (error) {
        console.error("Error al obtener PQRS del usuario: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
});

module.exports = router;


const express = require("express");
const router = express.Router();
const moderatorController = require("../controllers/moderatorController");
const { verificarToken, permitirRoles } = require("../middleware/authMiddleware");

// Middleware para verificar que es moderador (adminSistema o adminEvento)
const isModerator = permitirRoles("adminSistema", "adminEvento");

// ========== RUTA DE PERFIL ==========
router.get("/profile", verificarToken, isModerator, async (req, res) => {
    try {
        res.json({
            id: req.user._id,
            email: req.user.email,
            nombreEmpresa: req.user.nombreEmpresa,
            role: req.user.role,
            sector: req.user.sector,
            datosContacto: req.user.datosContacto,
            representante: req.user.representante,
            createdAt: req.user.createdAt
        });
    } catch (error) {
        console.error("Error al obtener perfil del moderador: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
});

// ========== RUTAS DE USUARIOS ==========
router.get("/users/pending", verificarToken, isModerator, moderatorController.getPendingUsers);
router.get("/users", verificarToken, isModerator, moderatorController.getAllUsers);
router.get("/users/:id", verificarToken, isModerator, async (req, res) => {
    try {
        const User = require("../models/User");
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error al obtener usuario: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
});
router.patch("/users/:id/estado", verificarToken, isModerator, moderatorController.updateUserStatus);

// ========== RUTAS DE EVENTOS ==========
router.get("/events/pending", verificarToken, isModerator, moderatorController.getPendingEvents);
router.patch("/events/:id/estado", verificarToken, isModerator, moderatorController.updateEventStatus);

// ========== RUTAS DE PQRS ==========
router.get("/pqrs", verificarToken, isModerator, moderatorController.getAllPQRS);
router.get("/pqrs/:id", verificarToken, isModerator, moderatorController.getPQRSById);
router.post("/pqrs/:id/responder", verificarToken, isModerator, moderatorController.respondPQRS);
router.patch("/pqrs/:id/estado", verificarToken, isModerator, moderatorController.updatePQRSStatus);

module.exports = router;


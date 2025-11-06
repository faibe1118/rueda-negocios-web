const User = require("../models/User");
const Event = require("../models/Event");
const PQRS = require("../models/PQRS");

// ========== USUARIOS ==========

// Obtener usuarios pendientes de aprobación
exports.getPendingUsers = async (req, res) => {
    try {
        const users = await User.find({ estadoRegistro: "pendiente" })
            .select("-password")
            .sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.error("Error al obtener usuarios pendientes: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// Aprobar o rechazar usuario
exports.updateUserStatus = async (req, res) => {
    try {
        const { estado } = req.body;
        
        if (!["pendiente", "aprobado", "rechazado"].includes(estado)) {
            return res.status(400).json({ message: "Estado no válido." });
        }

        const updated = await User.findByIdAndUpdate(
            req.params.id,
            { estadoRegistro: estado },
            { new: true }
        ).select("-password");

        if (!updated) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        res.json(updated);
    } catch (error) {
        console.error("Error al actualizar estado de usuario: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// Obtener todos los usuarios para moderación
exports.getAllUsers = async (req, res) => {
    try {
        const { estado } = req.query;
        const filter = {};
        
        if (estado) {
            filter.estadoRegistro = estado;
        }

        const users = await User.find(filter)
            .select("-password")
            .sort({ createdAt: -1 });
        
        res.json(users);
    } catch (error) {
        console.error("Error al obtener usuarios: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// ========== EVENTOS ==========

// Obtener eventos pendientes de aprobación
exports.getPendingEvents = async (req, res) => {
    try {
        const events = await Event.find({ estado: "pendiente" })
            .populate("creador", "nombreEmpresa email sector")
            .sort({ createdAt: -1 });
        res.json(events);
    } catch (error) {
        console.error("Error al obtener eventos pendientes: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// Aprobar o rechazar evento
exports.updateEventStatus = async (req, res) => {
    try {
        const { estado } = req.body;
        
        if (!["pendiente", "aprobado", "rechazado"].includes(estado)) {
            return res.status(400).json({ message: "Estado no válido." });
        }

        const updated = await Event.findByIdAndUpdate(
            req.params.id,
            { estado },
            { new: true }
        ).populate("creador", "nombreEmpresa email");

        if (!updated) {
            return res.status(404).json({ message: "Evento no encontrado." });
        }

        res.json(updated);
    } catch (error) {
        console.error("Error al actualizar estado de evento: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// ========== PQRS ==========

// Crear PQRS
exports.createPQRS = async (req, res) => {
    try {
        const { tipo, asunto, descripcion } = req.body;

        if (!tipo || !asunto || !descripcion) {
            return res.status(400).json({ message: "Faltan campos obligatorios." });
        }

        const newPQRS = new PQRS({
            tipo,
            asunto,
            descripcion,
            usuario: req.user._id,
            estado: "pendiente"
        });

        await newPQRS.save();
        res.status(201).json({
            message: "PQRS creado correctamente.",
            pqrs: newPQRS
        });
    } catch (error) {
        console.error("Error al crear PQRS: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// Obtener todos los PQRS
exports.getAllPQRS = async (req, res) => {
    try {
        const { estado, tipo } = req.query;
        const filter = {};
        
        if (estado) {
            filter.estado = estado;
        }
        if (tipo) {
            filter.tipo = tipo;
        }

        const pqrsList = await PQRS.find(filter)
            .populate("usuario", "nombreEmpresa email")
            .populate("moderador", "nombreEmpresa email")
            .sort({ createdAt: -1 });

        res.json(pqrsList);
    } catch (error) {
        console.error("Error al obtener PQRS: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// Obtener PQRS por ID
exports.getPQRSById = async (req, res) => {
    try {
        const pqrs = await PQRS.findById(req.params.id)
            .populate("usuario", "nombreEmpresa email datosContacto")
            .populate("moderador", "nombreEmpresa email");

        if (!pqrs) {
            return res.status(404).json({ message: "PQRS no encontrado." });
        }

        res.json(pqrs);
    } catch (error) {
        console.error("Error al obtener PQRS: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// Responder PQRS
exports.respondPQRS = async (req, res) => {
    try {
        const { respuesta, estado } = req.body;

        if (!respuesta) {
            return res.status(400).json({ message: "La respuesta es obligatoria." });
        }

        const updateData = {
            respuesta,
            moderador: req.user._id,
            fechaRespuesta: new Date()
        };

        if (estado && ["pendiente", "en_proceso", "resuelto", "cerrado"].includes(estado)) {
            updateData.estado = estado;
        } else {
            updateData.estado = "resuelto";
        }

        const updated = await PQRS.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate("usuario", "nombreEmpresa email")
         .populate("moderador", "nombreEmpresa email");

        if (!updated) {
            return res.status(404).json({ message: "PQRS no encontrado." });
        }

        res.json(updated);
    } catch (error) {
        console.error("Error al responder PQRS: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// Actualizar estado de PQRS
exports.updatePQRSStatus = async (req, res) => {
    try {
        const { estado } = req.body;
        
        if (!["pendiente", "en_proceso", "resuelto", "cerrado"].includes(estado)) {
            return res.status(400).json({ message: "Estado no válido." });
        }

        const updated = await PQRS.findByIdAndUpdate(
            req.params.id,
            { estado },
            { new: true }
        ).populate("usuario", "nombreEmpresa email")
         .populate("moderador", "nombreEmpresa email");

        if (!updated) {
            return res.status(404).json({ message: "PQRS no encontrado." });
        }

        res.json(updated);
    } catch (error) {
        console.error("Error al actualizar estado de PQRS: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};


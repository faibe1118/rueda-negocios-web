const Event = require("../models/Event");

// Crear evento
exports.createEvent = async (req, res) => {
    try {
        const {
            nombreEvento,
            descripcion,
            descripcionCompleta,
            fecha,
            ubicacion,
            categoria,
            imagen,
            capacidadMaxima
        } = req.body;

        if (!nombreEvento || !descripcion || !fecha || !ubicacion) {
            return res.status(400).json({ message: "Faltan campos obligatorios." });
        }

        const newEvent = new Event({
            nombreEvento,
            descripcion,
            descripcionCompleta,
            fecha,
            ubicacion,
            categoria,
            imagen,
            capacidadMaxima,
            creador: req.user._id,
            estado: "pendiente"
        });

        await newEvent.save();
        res.status(201).json({
            message: "Evento creado correctamente, en espera de aprobación.",
            event: newEvent
        });
    } catch (error) {
        console.error("Error al crear evento: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// Obtener todos los eventos
exports.getEvents = async (req, res) => {
    try {
        const { estado } = req.query;
        const filter = {};
        
        if (estado) {
            filter.estado = estado;
        }

        const events = await Event.find(filter)
            .populate("creador", "nombreEmpresa email")
            .populate("participantes", "nombreEmpresa email")
            .sort({ createdAt: -1 });

        res.json(events);
    } catch (error) {
        console.error("Error al obtener eventos: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// Obtener evento por ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate("creador", "nombreEmpresa email sector")
            .populate("participantes", "nombreEmpresa email");

        if (!event) {
            return res.status(404).json({ message: "Evento no encontrado." });
        }

        res.json(event);
    } catch (error) {
        console.error("Error al obtener evento: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// Actualizar estado del evento (aprobado/rechazado)
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
        console.error("Error al actualizar estado: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// Eliminar evento
exports.deleteEvent = async (req, res) => {
    try {
        const deleted = await Event.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Evento no encontrado." });
        }
        res.json({ message: "Evento eliminado." });
    } catch (error) {
        console.error("Error al eliminar evento: ", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};


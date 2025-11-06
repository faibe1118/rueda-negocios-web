const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    nombreEvento: { type: String, required: true },
    descripcion: { type: String, required: true },
    descripcionCompleta: String,
    fecha: { type: Date, required: true },
    ubicacion: { type: String, required: true },
    categoria: String,
    imagen: String,
    creador: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    estado: { 
        type: String, 
        enum: ["pendiente", "aprobado", "rechazado"], 
        default: "pendiente" 
    },
    participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    capacidadMaxima: Number
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
const mongoose = require("mongoose");

const pqrSchema = mongoose.Schema({
    tipo: { 
        type: String, 
        enum: ["peticion", "queja", "reclamo", "sugerencia"], 
        required: true 
    },
    asunto: { type: String, required: true },
    descripcion: { type: String, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    estado: { 
        type: String, 
        enum: ["pendiente", "en_proceso", "resuelto", "cerrado"], 
        default: "pendiente" 
    },
    respuesta: String,
    moderador: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fechaRespuesta: Date
}, { timestamps: true });

module.exports = mongoose.model("PQRS", pqrSchema);


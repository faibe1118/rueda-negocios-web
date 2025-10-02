require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error MongoDB:", err));

// Rutas básicas
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

// Arrancar servidor
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🚀 Servidor en http://localhost:${port}`));

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path")

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//archivos estaticos
app.use(express.static(path.join(__dirname, "../frontend")));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error MongoDB:", err));

// Rutas básicas
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


// Arrancar servidor
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🚀 Servidor en http://localhost:${port}`));

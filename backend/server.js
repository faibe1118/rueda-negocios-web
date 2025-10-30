require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path")
const expressLayouts = require("express-ejs-layouts")
const cookieParser = require("cookie-parser")

const app = express();

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Exponer autenticación a las vistas
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.cookies && req.cookies.auth === '1';
  next();
});

//archivos estaticos
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(express.static(path.join(__dirname, "public")));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error MongoDB:", err));

// Rutas básicas
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Rutas de páginas
const pageRoutes = require("./routes/pages");
app.use("/", pageRoutes);


// Arrancar servidor
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🚀 Servidor en http://localhost:${port}`));

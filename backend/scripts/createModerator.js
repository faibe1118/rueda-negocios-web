require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => {
    console.error("❌ Error MongoDB:", err);
    process.exit(1);
  });

// Crear usuario moderador
async function createModerator() {
  try {
    // Verificar si ya existe un moderador con este email
    const existingUser = await User.findOne({ email: "moderador@workside.com" });
    
    if (existingUser) {
      console.log("⚠️  Ya existe un usuario con este email. Eliminando...");
      await User.deleteOne({ email: "moderador@workside.com" });
    }

    // Crear nuevo usuario moderador
    const moderator = new User({
      email: "moderador@workside.com",
      password: "moderador123", // Se hasheará automáticamente
      role: "adminSistema",
      nombreEmpresa: "WorkSide Administración",
      logoEmpresa: "https://via.placeholder.com/150",
      sector: "Tecnología",
      formalizada: true,
      nit: "900123456-7",
      datosContacto: {
        correo: "moderador@workside.com",
        telefono: "+57 300 123 4567",
        direccion: "Calle 123 #45-67, Bogotá"
      },
      representante: {
        nombre: "Administrador Sistema",
        documento: "1234567890",
        cargo: "Administrador"
      },
      aceptaTerminos: true,
      estadoRegistro: "aprobado" // Aprobado para que pueda hacer login inmediatamente
    });

    await moderator.save();
    
    console.log("\n✅ Usuario moderador creado exitosamente!\n");
    console.log("📧 Email: moderador@workside.com");
    console.log("🔑 Password: moderador123");
    console.log("👤 Rol: adminSistema");
    console.log("📊 Estado: aprobado\n");
    console.log("🌐 Puedes iniciar sesión en: http://localhost:4000/login\n");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al crear moderador:", error);
    process.exit(1);
  }
}

// Ejecutar
createModerator();


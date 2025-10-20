const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  //credenciales
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },

  //rol 
  role: { type: String, enum: ["adminSistema","adminEvento","ofertante","demandante"], required: true },

  //datos principales de la empresa
  nombreEmpresa: { type: String, required: true },
  logoEmpresa: {type: String, required: true},//ruta del jpg o foto del logo como tal
  sector: { type: String, required: true },
  formalizada: { type: Boolean, required: true },

  //datos de contacto de la empresa
  datosContacto: {
    correo: String,
    telefono: String,
    direccion: String,
    redes: [String]
  },

  //datos del representante
  representante: {
    nombre: String,
    documento: String,//numero de la cedula como tal
    cargo: String
  },

  //numero de identificacion de la empresa
  nit: { type: String },//esto son numero o textos como tal (si esta formalizada)
  rutProvisional: String,//esto son numero o textos como tal (si no esta formalizada)


  documentosFormalizados: {
    rut: String,//esto es la ruta de un pdf
    certificadoExistencia: String,//esto es la ruta de otro pfd
    cedulaRepresentante: String//ruta del pdf de la cedula como tal
  },

  documentosNoFormalizados: {
    comprobanteMatricula: String,//ruta de un pdf
    cedulaSolicitante: String //ruta del pdf de la cedula como tal
  },

  // PDFs principales
  catalogoPDF: String,  // ruta o URL del PDF con lo que ofrece (si es ofertante)
  necesidadesPDF: String,  // ruta o URL del PDF con lo que necesita (si es demandante)

  aceptaTerminos: { type: Boolean, required: true },
  estadoRegistro: { type: String, enum: ["pendiente","aprobado","rechazado"], default: "pendiente" }

}, { timestamps: true });

// Hash de contraseña
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para comparar contraseñas, compara la contrasenia que metieron y la contrasenia cifrada
userSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

//metodo para obtener un json pero con los datos limpios es decir sin contrasenia, solo correo, role, fecha de creacion del usuario, etc
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
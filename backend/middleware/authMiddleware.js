const jwt = require("jsonwebtoken");
const User = require("../models/User");

//verifica que el token sea valido
exports.verificarToken = async (req, res, next) => {
    try{
        //leer el token del encabezado authorization
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({ message: "Acceso denegado. Token no proporcionado"});
        }

        //extraer el token
        const token = authHeader.split(" ")[1];

        //verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "miSecretoSuperSeguro");

        //buscar usuario por ID y adjuntarlo al request
        const user = await User.findById(decoded.id).select("-password");
        if(!user){
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        req.user = user; //ahora el  req.user contiene los datos del user autenticado
        next();
    }catch(err){
        console.error("Error en verificacion de token: ",err);
        res.status(403).json({ message: "Token inválido o expirado." });
    }
};

//permisos por rol
exports.permitirRoles = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user || !rolesPermitidos.includes(req.user.role)) {
            return res.status(403).json({ message: "No tienes permisos para realizar esta acción." });
        }
        next();
    };
};
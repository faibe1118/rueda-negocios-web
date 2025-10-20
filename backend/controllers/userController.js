const User = require("../models/User");

exports.createUser = async (req, res) => {
    try{
        const {
            email,
            password,
            role,
            nombreEmpresa,
            logoEmpresa,
            sector,
            formalizada,
            datosContacto,
            representante,
            nit,
            rutProvisional,
            documentosFormalizados,
            documentosNoFormalizados,
            catalogoPDF,
            necesidadesPDF,
            aceptaTerminos
        } = req.body;

        if(!email || !password || !role || !nombreEmpresa || !sector){
            return res.status(400).json({message: "Falcan campos obligatorios."});
        }

        if(!aceptaTerminos){
            return res.status(400).json({message: "Debe aceptar los terminos y condiciones."});
        }

        const existeUser = await User.findOne({email});//para buscar usuarios con un email igual, se puede hacer lo mismo con nit, rut, etc
        if(existeUser){
            return res.status(400).json({message: "El correo ya esta registrado"});
        }

        const newUser = new User({
            email,
            password,
            role,
            nombreEmpresa,
            logoEmpresa,
            sector,
            formalizada,
            datosContacto,
            representante,
            nit,
            rutProvisional,
            documentosFormalizados,
            documentosNoFormalizados,
            catalogoPDF,
            necesidadesPDF,
            aceptaTerminos
        });

        await newUser.save();

        res.status(201).json({
            message: "Usuario registrado correctamente, pero en espera de revision por parte de admin de sistema.",
            user: newUser
        });

    } catch(error){
        console.error("Error al registrar usuario: ", error);
        res.status(500).json({message: "Error del servidor."});
    }
};


/*

// Crear usuario (registro)
exports.createUser = async (req, res) => {
    try {
        const {
            email,
            password,
            role,
            nombreEmpresa,
            sector,
            formalizada,
            aceptaTerminos,
        } = req.body;

        // Validaciones mínimas
        if (
            !email ||
            !password ||
            !role ||
            !nombreEmpresa ||
            !sector ||
            formalizada === undefined
        ) {
            return res.status(400).json({ message: "Faltan campos obligatorios." });
        }

        if (!aceptaTerminos) {
            return res
                .status(400)
                .json({ message: "Debe aceptar los términos y condiciones." });
        }

        // Crear usuario
        const user = new User(req.body);

        // Guardar en DB
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (err) {
        if (err.code === 11000) {
            // error de email duplicado
            return res.status(400).json({ message: "El email ya está registrado." });
        }
        console.error(err);
        res.status(500).json({ message: "Error en el servidor." });
    }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener usuarios." });
    }
};

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return res.status(404).json({ message: "Usuario no encontrado." });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener usuario." });
    }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updated)
            return res.status(404).json({ message: "Usuario no encontrado." });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar usuario." });
    }
};

// Cambiar estado (aprobado / rechazado)
exports.updateEstado = async (req, res) => {
    try {
        const { estado } = req.body;
        if (!["pendiente", "aprobado", "rechazado"].includes(estado)) {
            return res.status(400).json({ message: "Estado no válido." });
        }
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            { estadoRegistro: estado },
            { new: true }
        );
        if (!updated)
            return res.status(404).json({ message: "Usuario no encontrado." });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar estado." });
    }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: "Usuario no encontrado." });
        res.json({ message: "Usuario eliminado." });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar usuario." });
    }
};*/

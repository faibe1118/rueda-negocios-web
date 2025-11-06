const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
    try{
        const { email, password} = req.body;

        //buscar usuario por email
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Usuario no encontrado"});
        }

        //verificar contrasenia
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: "Contrasenia incorrecta"});
        }

        //crear token
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET || "miSecretoSuperSeguro",
            {expiresIn: "2h"}
        );

        //envuar respuesta
        res.json({
            message: "Inicio de sesion exitoso.",
            token,
            user:{
                id: user._id,
                email: user.email,
                role: user.role,
                nombreEmpresa: user.nombreEmpresa
            }
        });

    }catch(err){
        console.error("Error en login: ", err);
        res.status(500).json({message: "Error del servidor"});
    }
};
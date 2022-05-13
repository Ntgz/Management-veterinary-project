import jwt from "jsonwebtoken";
import veterinario from "../models/veterinario.js";
import Paciente from "../models/Paciente.js";
//proteje las rutas y siempre verifica por el token en el header
const checkAuth = async (req, res, next) => {
    //restringir ciertas areas ejemplo:"un usuario pago o no pago"
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ) {
        // console.log("si tiene el token con bearer");
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.vet = await veterinario.findById(decoded.id).select("-password -token -confirmado"
            );
            return next();
        } catch (error) {
            const e = new Error("token no valido");
           return res.status(403).json({msg: e.message });
        }
    }

    if(!token) {
        const error = new Error("token no valido o inexistente");
        res.status(403).json({msg: error.message });
        

    }
    
    next();

};

export default checkAuth;
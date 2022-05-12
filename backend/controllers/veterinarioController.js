import veterinario from "../models/veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";
const registrar = async (req, res) => {
    const { email, nombre } = req.body
  
    // res.json({msg:"registrando..."})
    

    // prevenir usuarios duplicados

    const existeUsuario = await veterinario.findOne({email});

    if(existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message });
    } 
    // console.log(password)
    // console.log(nombre)
    

    try {
        //guardar veterinario
        const vete = new veterinario(req.body);
        const veterinarioGuardado = await vete.save();
        //enviar email
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token,
        });

      res.json(veterinarioGuardado);
    } catch (error) {
      console.log(error);
    }    
};

// const perfil = (req,res) =>{

//     const {vet} = req;


//     res.json({perfil:vet});
// }
const perfil = (req,res) =>{
    res.json({ msg: "Mostrando Perfil"});
}


const confirmar = async(req, res) => {
    const { token } = req.params
    
   //consulto mi base de datos
    const usuarioConfirmar = await veterinario.findOne({ token });
    if (!usuarioConfirmar) {
        const error = new Error("Token no valido");
        return res.status(404).json({ msg: error.message });
    }

    try {

        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();

        res.json({msg: "usuario confirmado correctamente"});
        
    } catch (error) {
        console.log(error)
    }

    
};

const autenticar = async(req,res) =>{

    const { email, password } = req.body;

    const usuario = await veterinario.findOne({ email });
    //si el usuairo existe
    if (!usuario) {
        const error = new Error("El usuario no existe");

        return res.status(404).json({msg: error.message });
       

    } 

    //si el usuairo esta confirmado

    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no esta confirmada");

        return res.status(403).json({msg: error.message });
    }
    //revisar password

    if(await usuario.comprobarPassword(password)){

        console.log(usuario)
        res.json({
            // _id: usuario_id,
            // nombre: usuario.nombre,
            // email: usuario.email,
            token:generarJWT(usuario.id)});

    } else {

        const error = new Error("password incorrecto");

        return res.status(403).json({msg: error.message });
    }

}

const olvidePassword = async(req, res) => {
    const { email } = req.body;
    const existeVeterinario = await veterinario.findOne({email})
    if(!existeVeterinario){
        const error = new Error("usuario no existe")

        return res.status(400).json({msg: error.message });
    }

    try {

        existeVeterinario.token = generarId()
        await existeVeterinario.save()
        //Enviar email con instrucciones
        emailOlvidePassword({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token,
        })
        res.json({msg: "hemos enviado un email con las instrucciones" });
        
    } catch (error) {
        console.log(error);
    }

}
const comprobarToken = async (req, res) => {

    const {token} = req.params;
    
    const tokenValido = await veterinario.findOne({ token });

    if (tokenValido) {
        res.json({ msg: "Token valdo, usuario existe" });
    } else {
        const error = new Error("Token no valido");

        return res.status(400).json({msg: error.message });
    }
    
}
const nuevoPassword = async(req, res) => {
    const {token} = req.params;
    
    const {password} = req.body;

    const vet = await veterinario.findOne({token});
    if(!vet){
        const error = new Error("hubo error");

        return res.status(400).json({msg: error.message });
    }

    try {
        vet.token = null;
        vet.password = password;
        await vet.save();
        res.status(400).json({msg: "password modificado correcto" });
    } catch (error) {
        console.log(error)
    }
}



export {
    perfil,
    registrar,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword

}
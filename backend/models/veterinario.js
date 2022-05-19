import mongoose from "mongoose";
import generarId from "../helpers/generarId.js";
import bcrypt from "bcrypt";


const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true, //validacion servidor
        trim: true, //eliminar espacios en blanco
    },
    password: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true, //no se repita
        trim: true

    },
    telefono: {
        type: String,
        default: null, //no es obligatorio
        trim: true,
    },
    web: {
        type: String,
        default: null, 
    },
    token: {
        type: String,
        default: generarId(),
    },
    confirmado: {
        type: Boolean,
        default: false,
    }
});


veterinarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


veterinarioSchema.methods.comprobarPassword = async function ( passwordFormulario ) 
{
    return await bcrypt.compare(passwordFormulario, this.password);
};


const veterinario = mongoose.model("veterinario", veterinarioSchema );
export default veterinario;
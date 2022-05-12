import mongoose from 'mongoose';

const pacientesSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true, //validacion servidor
    },
    propietario: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        

    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    sintomas: {
        type: String,
        required: true,
    },

    veterinario: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'veterinario',
    },

},

    {
        timestamps: true, //crear columnas editado y creado
    }

);


const Paciente = mongoose.model("Paciente", pacientesSchema);

export default Paciente;
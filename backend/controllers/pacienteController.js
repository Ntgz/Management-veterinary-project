import Paciente from "../models/Paciente.js";


const agregarPaciente =  async(req, res) =>{

    const paciente = new Paciente(req.body);
    // console.log(paciente);
    paciente.veterinario = req.vet._id;
    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
        // console.log(paciente);
    } catch (error) {
        console.log(error)
    }

};


const obtenerPaciente = async (req, res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.vet);
    res.json(pacientes);
};


const obtenerPacientes = async (req, res) => {
    // console.log(req.params.id);
    const { id } = req.params;
    const paciente = await Paciente.findById(id);
    // console.log(paciente)
    // if(!paciente){
    //     return res.status(404).json({msg: "No encontrado"});
    // }
    console.log(paciente.veterinario._id);
    console.log(req.vet._id);
    if(paciente.veterinario._id.toString() !== req.vet._id.toString()) {
        return res.json({ msg: "Accion no valida"});
    }
    
        res.json(paciente);
    
}
const actualizarPaciente = async(req,res)=>{
    const {id} = req.params;
    const paciente = await Paciente.findById(id);
    // console.log(paciente)
    if(!paciente){
        return res.status(404).json({msg: "No encontrado"});
    }
    if(paciente.veterinario._id.toString() !== req.vet._id.toString()) {
        return res.json({ msg: "Accion no valida"});
    }
 
    paciente.nombre = req.body.nombre;

    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);
    } catch (error) {
        console.log(error);
    }
}
const eliminarPaciente = async (req, res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);
    // console.log(paciente)
    if(!paciente){
        return res.status(404).json({msg: "No encontrado"});
    }
    if(paciente.veterinario._id.toString() !== req.vet._id.toString()) {
        return res.json({ msg: "Accion no valida"});
    }


    try {
        await paciente.deleteOne();
        res.json({ msg: "paciente Eliminado"});
    } catch (error) {
        console.log(error);
    }
};


export { agregarPaciente, obtenerPaciente, obtenerPacientes, actualizarPaciente, eliminarPaciente };
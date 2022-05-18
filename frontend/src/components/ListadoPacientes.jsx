//ventaja de context(no toca enviar state desde la app hacia todo el arbol de componentes sino que se puede consumir en cada uno de los componentes donde se necesite la informacion )

import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";
const ListadoPacientes = () => {
    const { pacientes } = usePacientes()  
    return (
        <>
            { pacientes.length ? 
            (
                <>

                    <h2 className="font-black text-3xl text-center"> Listado pacientes </h2>
                    <p className="text-center text-xl mt-5 mb-10">
                        Administra tus {''}
                        <span className=" text-indigo-400 font-bold"> pacientes y citas</span>
                    </p>
                    {pacientes.map( paciente => (
                        <Paciente
                            key={paciente._id}
                            paciente={paciente}
                        />
                    ))}
                </>
            ) :
            (
                <>
                    <h2 className="font-black text-3xl text-center"> No hay pacientes </h2>
                    <p className="text-center text-xl mt-5 mb-10">
                        Comienza agregando pacientes {''}
                        <span className=" text-indigo-400 font-bold">y apareceran en este lugar</span>
                    </p>
                </>
            )}
        </>
    )
};

export default ListadoPacientes

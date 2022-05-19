import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
const Header = () => {

        const { cerrarSesion } = useAuth()

    return (
        <header className="py-10 bg-indigo-900">

            <div className="container mx-auto flex flex-col justify-between items-center lg:flex-row">
                <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de pacientes de {''} <span className="text-white font-black"> Veterinaria</span></h1>
            

            <nav className="flex gap-4 flex-col lg:flex-row mt-5 lg:mt-0 items-center">
                <Link to="/admin" className="text-white text-xl">Pacientes</Link>
                <Link to="/admin/perfil"  className="text-white text-xl">Perfil</Link>

                <button 
                className="text-white text-xl" 
                type="button"
                onClick={cerrarSesion} >
                    Cerrar sesion
                </button>
            </nav>
            </div>

        </header>
    )
}

export default Header;

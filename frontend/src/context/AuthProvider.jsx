//estado global de la aplicacion
import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/axios'

const AuthContext = createContext()

//antes era props (children = todos los componentes que estan en Authprovider)

//se pueden crear y enviar funciones para disposicion global
const AuthProvider = ({children}) => {
    const [cargando, setCargando] = useState(true)
    const [ auth, setAuth ] = useState({});
    //efecto secundario
    useEffect(() => {
            const autenticarUsuario = async () => {
                const token = localStorage.getItem('token')

                if (!token) { 
                    setCargando(false)
                    return
                }

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                //setea autentificacion del usuario
                try {
                    const { data } = await clienteAxios('/veterinarios/perfil', config)

                    setAuth(data)
                } catch (error) {
                    console.log(error.response.data.msg)
                    setAuth({})
                }
                setCargando(false)
            }
    autenticarUsuario()
    }, [])
    
    const cerrarSesion = () =>{
        localStorage.removeItem('token')
        setAuth({})
    }
    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('token')

        if (!token) { 
            setCargando(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const { data } = await clienteAxios.put(url, datos, config)
            return {
                msg: 'Almacenado correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil
            }}
        >

            {children}

        </AuthContext.Provider>
    )

}

export {
    AuthProvider
}

export default AuthContext
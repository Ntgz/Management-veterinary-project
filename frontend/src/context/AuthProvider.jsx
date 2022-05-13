//estado global de la aplicacion
import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/axios'
// import { AuthProvider } from './AuthProvider'
const AuthContext = createContext()

//antes era props (children = todos los componentes que estan en Authprovider)

//se pueden crear y enviar funciones para disposicion global
const AuthProvider = ({children}) => {
    const [ auth, setAuth ] = useState({});
    useEffect(() => {
            const autenticarUsuario = async () => {
                const token = localStorage.getItem('token')

                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                try {
                    const { data } = await clienteAxios('/veterinarios/perfil', config)

                    setAuth(data)
                } catch (error) {
                    console.log(error.response.data.msg)
                    setAuth()
                }
            }
    autenticarUsuario()
    }, [])    

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth
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
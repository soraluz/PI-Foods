import Imagen_Cook from '../../src/Imagen_Inicio.png'
import { NavLink } from "react-router-dom"

export default function Inicio(){
    return <>
                <img src={Imagen_Cook} alt='imagen de fondo' placeholder="API de FOOD" />
                <NavLink to='/home'><button>Ingreso</button></NavLink>
            </>
}
import Imagen_Cook from '../../src/Imagen_Inicio.png'
import { NavLink } from "react-router-dom"
import '../Styles/Inicio.css'

export default function Inicio(){
    return <div className='inicio'>
                <img src={Imagen_Cook} alt='imagen de fondo' placeholder="API de FOOD" />
                <NavLink to='/home'><button>Ingreso</button></NavLink>
            </div>
}
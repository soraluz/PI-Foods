import Buscar from './Buscar.jsx'
import Ordenar from './Ordenar.jsx'
import Filtrar from './Filtrar.jsx'
import { NavLink } from 'react-router-dom'
import '../Styles/Nav.css'

export default function Nav(){
    return  <div className='nav'>
                <Buscar />
                <Filtrar />
                <Ordenar />
                <NavLink to='/recipes/create'>Nueva Receta</NavLink>
            </div>
}
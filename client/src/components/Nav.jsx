import Buscar from './Buscar.jsx'
import Ordenar from './Ordenar.jsx'
import Filtrar from './Filtrar.jsx'
import { NavLink } from 'react-router-dom'

export default function Nav(){
    return <div>
        <Buscar />
        <Filtrar />
        <Ordenar />
        <NavLink to='/recipes/create'><p>Nueva Receta</p></NavLink>
    </div>
}
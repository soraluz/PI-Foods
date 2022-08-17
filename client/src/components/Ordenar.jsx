import { sortRecipesAsc,sortRecipesDesc } from "../actions/action"
import { connect } from "react-redux"
import '../Styles/Ordenar.css'

export function Ordenar(props){
    function hanledSelect(e){
        e.preventDefault()
        if(e.target.value==='Ascendente'){
            props.sortRecipesAsc(e.target.name)
        }

        else if(e.target.value==='Descendente'){
            props.sortRecipesDesc(e.target.name)
        }
        if(e.target.name==='Nombre') e.target.value='Ordenar X Nombre'
        else if(e.target.name==='Health Score') e.target.value='Ordenar X Healh Score'
        
    }
    return <div className="ordenar">
        <p>Ordenar</p>
       <select name="Nombre" onChange={(e)=>hanledSelect(e)}>
           <option value='Ordenar X Nombre'>Ordenar X Nombre</option>
           <option value='Ascendente'>Ascendente</option>
           <option value='Descendente'>Descendente</option>
       </select>
       <select name="Health Score" onChange={(e)=>hanledSelect(e)}>
           <option value='Ordenar X Healh Score'>Ordenar X Health Score</option>
           <option value='Ascendente'>Ascendente</option>
           <option value='Descendente'>Descendente</option>
       </select>
    </div>
}
function mapDispatchToProps(dispatch){
    return{
        sortRecipesAsc:(campo)=>dispatch(sortRecipesAsc(campo)),
        sortRecipesDesc:(campo)=>dispatch(sortRecipesDesc(campo))
    }
}

export default connect(null, mapDispatchToProps)(Ordenar)
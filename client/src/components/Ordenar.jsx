import { sortRecipesAsc,sortRecipesDesc } from "../actions/action"
import { connect } from "react-redux"

export function Ordenar(props){
    function hanledSelect(e){
        e.preventDefault()
        if(e.target.value=='Ascendente'){
            props.sortRecipesAsc(e.target.name)
        }

        if(e.target.value=='Descendente'){
            props.sortRecipesDesc(e.target.name)
        }

        
    }
    return <div>
       <select name="Nombre" onChange={(e)=>hanledSelect(e)}>
           <option>Ordenar X Nombre</option>
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
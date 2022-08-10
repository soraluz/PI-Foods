import { useEffect } from "react"
import { filterRecipes, getAllDiets } from "../actions/action"
import { connect } from "react-redux"

export function Filtrar(props){

    function handledSelect(e){
        e.preventDefault()
        props.filterRecipes(e.target.value)
    }
    return <div>
    {useEffect(() => {
        props.getAllDiets() 
}, [])}
            <label>Tipo de Dieta</label>
            <select name="diet" onChange={(e)=>handledSelect(e)}>
                <option>todos</option>
                {props.diets.map((diet)=>{
                return <option value={diet.name}>{diet.name}</option>
            })}
          </select>
         

    </div>
}
function mapStateToProps(state){
    return{
        diets:state.diets
    }
}
function mapDispatchToProps(dispatch){
    return{
        getAllDiets:()=>dispatch(getAllDiets()),
        filterRecipes:(data)=>dispatch(filterRecipes(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtrar)
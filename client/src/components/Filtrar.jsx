import { useEffect } from "react"
import { filterRecipes, getAllDiets,getAllRecipes } from "../actions/action"
import { connect } from "react-redux"
import '../Styles/Filtrar.css'

export function Filtrar(props){
    {useEffect(() =>  props.getAllDiets(), [])}

    function handledSelect(e){
        e.preventDefault()
        if(e.target.value==='todos') props.getAllRecipes()
        else {
           props.filterRecipes(e.target.value)            
        }
    }
    return <div className="filtrado">

            <label>Tipo de Dieta</label>
            <select name="diet" onChange={(e)=>handledSelect(e)}>
                <option value='todos'>todos</option>
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
        filterRecipes:(data)=>dispatch(filterRecipes(data)),
        getAllRecipes:()=>dispatch(getAllRecipes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filtrar)
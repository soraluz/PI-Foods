import { connect } from "react-redux"
import { searchRecipes } from "../actions/action"

export function Buscar({searchRecipes}){
    function handledSubmit(e){
        e.preventDefault();
        let query=document.querySelector('input[name=query]')
        if(query.value){
            searchRecipes(query.value)
            query.value=""
        } 
        else return "Debe completar el campo"    
    }
       
    return <div>
       Buscar: <input type="text" name="query" placeholder="Ingrese el nombre del plato a Buscar" /> 
       <button name="buscar" onClick={(e)=>handledSubmit(e)}>Buscar</button>
    </div>
}

function mapDispatchToProps(dispatch){
    return{
        searchRecipes:(diet)=>dispatch(searchRecipes(diet))
    }
}

export default connect(null, mapDispatchToProps)(Buscar)
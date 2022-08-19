import { useState } from "react";
import { connect } from "react-redux"
import { searchRecipes } from "../actions/action"
import '../Styles/Buscar.css'

export function Buscar(props){
    const [input,setInput]=useState("")
    const [error,setError]=useState("")
    function handledChange(e){
        setInput(e.target.value)
    }

    function handledSubmit(e){
        e.preventDefault();
        //let query=document.querySelector('input[name=query]')
        if(input){
            console.log('texto a buscar',input)
            props.searchRecipes(input)      
            setInput("")
            setError("")
        }  
        else setError("Debe Ingresar informacion a buscar")
    }
       
    return <div className="buscar">
             <label>Buscar :</label>
             <input type="text" name="query" value={input} onChange={handledChange} placeholder="Ingrese el nombre del plato a Buscar" /> 
            <button name="buscar" className="boton" onClick={(e)=>handledSubmit(e)}>Buscar</button>
            {error?<p>{error}</p>:null}
           </div>
}

function mapDispatchToProps(dispatch){
    return{
        searchRecipes:(diet)=>dispatch(searchRecipes(diet))
    }
}
export default connect(null, mapDispatchToProps)(Buscar)
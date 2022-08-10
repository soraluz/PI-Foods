import React from "react"
import { connect } from "react-redux"
import Recipes from "./Recipes"
import { useEffect } from "react"
import { getAllRecipes } from "../actions/action"

export function Home(props){
    return <div>
        {useEffect(() => {
            props.getAllRecipes() 
}, [])}
   {props.busqueda.length?<Recipes recetas={props.busqueda}/>:
    props.filtro.length?<Recipes recetas={props.filtro}/>:<Recipes recetas={props.recipes}/>}
    </div>
}
function mapStateToProps(state){
    return{
        recipes:state.recipes,
        filtro:state.filtro,
        busqueda:state.busqueda
    }
}
function mapDispatchToProps(dispatch){
    return{
        getAllRecipes:()=>dispatch(getAllRecipes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
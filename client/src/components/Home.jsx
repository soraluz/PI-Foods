import React from "react"
import { connect } from "react-redux"
import Recipes from "./Recipes"
import { useEffect } from "react"
import { getAllRecipes } from "../actions/action"
import '../Styles/Home.css'

export function Home(props){
    {useEffect(() =>  props.getAllRecipes(), [])}
    return <div>
        
   {props.loading ? <span id="loading">{props.loading}</span>:null  }
   {props.ordenAsc.length?<Recipes recetas={props.ordenAsc}/>:
    props.ordenDesc.length?<Recipes recetas={props.ordenDesc}/>:
    props.busqueda.length?<Recipes recetas={props.busqueda}/>:
    props.filtro.length?<Recipes recetas={props.filtro}/>:null
}
    </div>
}
function mapStateToProps(state){
    return{
        recipes:state.recipes,
        filtro:state.filtro,
        busqueda:state.busqueda,
        ordenAsc:state.ordenAsc,
        ordenDesc:state.ordenDesc,
        loading:state.loading
    }
}
function mapDispatchToProps(dispatch){
    return{
        getAllRecipes:()=>dispatch(getAllRecipes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
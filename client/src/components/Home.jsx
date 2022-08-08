import React from "react"
import { connect } from "react-redux"
import Recipes from "./Recipes"
import Nav from "./Nav"
import { useEffect } from "react"
import { getAllRecipes } from "../actions/action"

export function Home(props){
    return <div>
        {useEffect(() => {
            props.getAllRecipes() 
            console.log("this component has been mounted");
}, [])}
    <Nav />
    <Recipes recetas={props.recipes}/>   
    </div>

}
function mapStateToProps(state){
    return{
        recipes:state.recipes
    }
}
function mapDispatchToProps(dispatch){
    return{
        getAllRecipes:()=>dispatch(getAllRecipes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
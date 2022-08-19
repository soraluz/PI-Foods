import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getDetailRecipe } from "../actions/action"
import '../Styles/Detail_Recipe.css'
import { NavLink } from "react-router-dom"

export function Detail_Recipe(props){
    
    useEffect(()=>{
       
        const id=props.match.params.id
        props.getDetailRecipe(id)
   
    },[])

    var tipos;

    console.log('dietas de id enviado', props.detail)

    if(props.detail.diets){
        console.log('ingreso al if si tiene dietas')
        tipos=new Set([...props.detail.diets])
    }
    else{
        console.log('Ingreso al else que no tiene dietas')
        tipos=new Set([])
    }
    
    if (props.detail.vegetarian) tipos.add('vegetarian')
    if (props.detail.vegan) tipos.add('vegan')
    if (props.detail.glutenFree) tipos.add('gluten free')
    if (props.detail.dairyFree) tipos.add('dairy free')
    let arreglo=[...tipos]
        
    return <div className="detail">
        <div><NavLink to='/Home'>Home</NavLink> </div>
         {props.loading ? 'loading...' :null  }
         <h2>{props.detail.title}</h2>
            {props.detail.image ? <img src={props.detail.image} alt='Imagen no encontrada' />:null}
            <p>{props.detail.dishTypes}</p>
            <p>{props.detail.summary}</p>
            <p>{ arreglo.join(" - ")}</p>
            <p>{props.detail.steps}</p>
        </div>    
}
function mapStateToProps(state){
    return{
        detail:state.detail,
        loading:state.loading
    }
}

function mapDispatchToProps(dispatch){
    return{
        getDetailRecipe:(id)=>dispatch(getDetailRecipe(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Detail_Recipe)
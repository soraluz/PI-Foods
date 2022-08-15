import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getDetailRecipe } from "../actions/action"
import '../Styles/Detail_Recipe.css'

export function Detail_Recipe(props){
    
    useEffect(()=>{
        const id=props.match.params.id
        props.getDetailRecipe(id)
    },[])



    if(props.detail.diets){
        var tipos=new Set([...props.detail.diets])
    }
    else{
        var tipos=new Set([])
    }
    
    if (props.detail.vegetarian) tipos.add('vegetarian')
    if (props.detail.vegan) tipos.add('vegan')
    if (props.detail.glutenFree) tipos.add('gluten free')
    if (props.detail.dairyFree) tipos.add('dairy free')
    let arreglo=[...tipos]
        
    return <div className="detail">
         <h2>{props.detail.title}</h2>
            {props.detail.image ? <img src={props.detail.image} alt='Imagen no encontrada' />:null}
            <p>{props.detail.dishTypes}</p>
            <p>{props.detail.summary}</p>
            <div>
            { arreglo?.map(tipo=>{
                    return <p>{tipo}</p>
            })} 
            </div> 
        </div>    
}
function mapStateToProps(state){
    return{
        detail:state.detail
    }
}

function mapDispatchToProps(dispatch){
    return{
        getDetailRecipe:(id)=>dispatch(getDetailRecipe(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Detail_Recipe)
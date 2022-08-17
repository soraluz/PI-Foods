import React from "react"
import { NavLink } from "react-router-dom"
import '../Styles/Recip.css'    

export default function Recip({receta}){
  var tipos;
  
    if(receta.diets){
        tipos=new Set([...receta.diets])
    }
    else{
        tipos=new Set([])
    }
    //Llena los tipos
    if (receta.vegetarian) tipos.add('vegetarian')
    if (receta.vegan) tipos.add('vegan')
    if (receta.glutenFree) tipos.add('gluten free')
    if (receta.dairyFree) tipos.add('dairy free')
    let arreglo=[...tipos]
        
    return <div className="tarjeta">
               <NavLink to={`/recipe/${receta.id}`} >
                <div className="recipe">
                    <h2>{receta.title}</h2>
                     {receta.image ? <img src={receta.image} alt='Imagen no encontrada' />:null
                     }
                    <p>{arreglo.join(' - ')}</p> 
                   
                    {receta.healthScore?<p>{receta.healthScore}</p>:null}
                </div>
              </NavLink>
            </div>
}
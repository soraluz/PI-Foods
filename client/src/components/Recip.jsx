import React from "react"
import { NavLink } from "react-router-dom"

export default function Recip({receta}){
    if(receta.diets){
        var tipos=new Set([...receta.diets])
    }
    else{
        var tipos=new Set([])
    }
    
    if (receta.vegetarian) tipos.add('vegetarian')
    if (receta.vegan) tipos.add('vegan')
    if (receta.glutenFree) tipos.add('gluten free')
    if (receta.dairyFree) tipos.add('dairy free')
    let arreglo=[...tipos]
        
    return <>
       <NavLink to={`/recipes/${receta.id}`}>
        <div>
         <h2>{receta.title}</h2>
            {receta.image ? <img src={receta.image} alt='Imagen no encontrada' />:null
            }
             { arreglo?.map(tipo=>{
                    return <p>{tipo}</p>
            })} 
            {receta.healthScore?<p>{receta.healthScore}</p>:null}
        </div>
        </NavLink>
        
   </>
}
import React from "react"
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
        
    return <div>
        <h1>{receta.title}</h1>
        {receta.image ? <img src={receta.image} alt='Imagen no encontrada' />:null
        }
         { arreglo?.map(tipo=>{
                    return <p>{tipo}</p>
            })} 
   </div>
}
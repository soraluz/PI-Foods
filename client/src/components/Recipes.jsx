import React, { useState } from 'react';
import Recip from './Recip'
import '../Styles/Recipes.css'

export default function Recipes({recetas}){
    const[currentPage,setCurrentPage]=useState(0);

    let pags=Math.ceil(recetas.length/9)
    let pag=currentPage/9+1
    let paginas=[];

    for(let i=0;i<pags;i++)paginas[i]=i+1

     function paginacion(){
        return recetas.slice(currentPage,currentPage+9)
    }

    function handledSumbit(e){
        console.log('ingreso handled',e.target)
        if(e.target.name==='next'){
            
            if(pag>=pags){ 
                            
            }
            else{
                nextPage()
            }
        }
        else if(e.target.name==='prev'){
           
            if(pag<=1){
               
            }
            else{
                prevPage()
                e.target.disabled=false
            }
           
        }
        else{
            pagina(e.target.value)
        }
        e.target.className='select'
    }

    function nextPage(){
        
              setCurrentPage(currentPage+9)
    }
    function prevPage(){

            setCurrentPage(currentPage-9)
    }
    function pagina(pag){
        pag--;
        setCurrentPage(pag*9)

    }

    return <div className='recipes'>
            <div className='paginado'>
                <button name='prev' onClick={(e)=>handledSumbit(e)}>Prev</button>
                {paginas.map((e)=>{
                    return <button name='pagina' onClick={(e)=>handledSumbit(e)} value={e}>{e}</button>
                })}
                <button name="next" onClick={(e)=>handledSumbit(e)}>Next</button>
            </div>
            <div className='home'>
            {
                 paginacion()?.map((receta)=>{
                 return <Recip receta={receta} />
                })
            }
           
            </div>
         </div>
}
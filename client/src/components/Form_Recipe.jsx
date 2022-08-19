import React from "react";
import {useDispatch, useSelector} from "react-redux"
import {createRecipe} from "../actions/action";
import  '../Styles/Form_Recipe.css'
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

export function validate(input){
   
    let errors={};
    let expLetras=/^[A-Za-z]+[A-Za-z\s]*[A-Za-z]$/
    if(!input.name){
        errors.name='Nombre es requerido';
    }else if(!expLetras.test(input.name)){
        errors.name='Nombre es invalido'
    }
    if(!input.summary){
        errors.summary="Resumen del plato requerido"
    }else if(!expLetras.test(input.summary)){
        errors.summary='Resumen del plato es invalido'
    }
    if(input.healthScore){
       if(!/\d+/.test(input.healthScore)){
        errors.healthScore='Nivel de comida debe ser numerico'
       }
       else if(input.healthScore<0 || input.healthScore>100){
        errors.healthScore='Nivel de comida es invalido'
       }
    }
return errors;
}

export default function Form_Recipe(props){

    useEffect(()=>{
       const boton= document.getElementById('enviar')
       boton.disabled=true
    },[]) 

    const loading=useSelector(state=>state.loading)

    const [input,setInput]=React.useState({
        name:'',
        summary:'',
        healthScore:'',
        steps:'',
        diets:[]
    })
    const [errors,setErrors]=React.useState({});

    const dispatch=useDispatch()

    function handleSubmit(e){
        e.preventDefault()
        dispatch(createRecipe(input))
    }
    function handleChange(e) {
       setInput({
        ...input,
        [e.target.name]:e.target.value
       })   
       setErrors(validate({
        ...input,[e.target.name]:e.target.value
      }))     
    }
    function hanledCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                diets:input.diets.concat(e.target.id)
            })
        }
        else{
            setInput({
                ...input,
                diets:input.diets.filter((dieta)=>{
                    return dieta!==e.target.id
                })
            })
        }
    }
    
return <div className="create" >
        <div ><NavLink to='/Home'>Home</NavLink> </div>
        <h2>Ingreso de Recetas</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="form">
                <label>Name: </label>
                <input type='text' className={errors.name && 'danger'} name='name' value={input.name} onChange={(e)=>handleChange(e)} /><br />
                {errors.name?<p>{errors.name}</p>:null}
                <label>Resumen del plato: </label>
                <input type='text' className={errors.summary && 'danger'} name='summary' value={input.summary} onChange={(e)=>handleChange(e)} /><br />
                {errors.summary?<p>{errors.summary}</p>:null}
                <label>Nivel de comida saludable: </label>
                <input type='text' className={errors.healthScore && 'danger'} name='healthScore' value={input.healthScore} onChange={(e)=>handleChange(e)} /><br />
                {errors.healthScore?<p>{errors.healthScore}</p>:null}
                <label>Paso a Paso: </label>
               <input type='text' name='steps' value={input.steps} onChange={(e)=>handleChange(e)} />
            </div>
            <h3>Tipos de Dietas:</h3>
            <div className="check">
                <input type="checkbox" id="1" value='gluten free' onClick={(e)=>hanledCheck(e)} />gluten free
                <input type="checkbox" id="2" value='dairy free' onClick={(e)=>hanledCheck(e)} />dairy free
                <input type="checkbox" id="3" value='lacto ovo vegetarian' onClick={(e)=>hanledCheck(e)} />lacto ovo vegetarian
                <input type="checkbox" id="4" value='vegetarian' onClick={(e)=>hanledCheck(e)} />vegetarian
                <input type="checkbox" id="5" value='vegan' onClick={(e)=>hanledCheck(e)} />vegan
                <input type="checkbox" id="6" value='paleolithic' onClick={(e)=>hanledCheck(e)} />paleolithic
                <input type="checkbox" id="7" value='primal' onClick={(e)=>hanledCheck(e)} />primal
                <input type="checkbox" id="8" value='whole 30' onClick={(e)=>hanledCheck(e)} />whole 30
                <input type="checkbox" id="9" value='pescatarian' onClick={(e)=>hanledCheck(e)} />pescatarian
                <input type="checkbox" id="10" value='ketogenic' onClick={(e)=>hanledCheck(e)} />ketogenic
                <input type="checkbox" id="11" value='fodmap friendly' onClick={(e)=>hanledCheck(e)} />fodmap friendly
            </div>
            <br />
            {loading?<p>{loading}</p>:null}
           <button id='enviar' disabled={(errors.hasOwnProperty('name')||errors.hasOwnProperty('summary')||errors.hasOwnProperty('healthScore')) ?true:false}>Enviar Datos</button>
          
        </form>
    </div>
}
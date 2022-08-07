import React from "react";
import {useDispatch} from "react-redux"
import {createRecipe} from "../actions/action";

export function validate(input){
    let errors={};
    if(!input.name){
        errors.name='Nombre es requerido';
    }else if(!/[A-Za-z]+\s*/.test(input.name)){
        errors.name='Nombre es invalido'
    }
    if(!input.summary){
        errors.summary="Resumen del plato requerido"
    }else if(!/\w+\s|\w+/gi.test(input.summary)){
        errors.summary='Nombre es invalido'
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
export default function Form_Recipe(){
    const [input,setInput]=React.useState({
        name:'',
        summary:'',
        healthScore:'',
        steps:''
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
    return <div>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <label>Name: </label>
            <input type='text' name='name' value={input.name} onChange={(e)=>handleChange(e)} />
            <p>{errors.name}</p>
            <label>Resumen del plato: </label>
            <input type='text' name='summary' value={input.summary} onChange={(e)=>handleChange(e)} />
            <p>{errors.summary}</p>
            <label>Nivel de "comida saludable: </label>
            <input type='text' name='healthScore' value={input.healthScore} onChange={(e)=>handleChange(e)} />
            <p>{errors.healthScore}</p>
            <label>Paso a Paso: </label>
            <input type='text' name='steps' value={input.steps} onChange={(e)=>handleChange(e)} />
            <p>{errors.steps}</p>
            <button>Enviar Datos</button>
        </form>
    </div>
}
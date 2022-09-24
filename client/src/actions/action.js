export function getAllRecipes(){
   
    return (dispatch)=>{
        dispatch(setStatus('...Cargando'))
        return fetch("http://localhost:3001/recipes")
        .then(r=>r.json())
        .then(data=> dispatch({
            type: 'GET_ALL_RECIPES',
            payload:data
        }))
        .catch(e=>dispatch(setStatus('No se encontraron registros')))
    }
}

export function getDetailRecipe(id){
   
   
    return (dispatch)=>{
        dispatch(setStatus('...Cargando'))
        return fetch(`http://localhost:3001/recipes/${id}`)
        .then(r=>r.json())
        .then(data=> dispatch({
            type: 'GET_DETAIL_RECIPE',
            payload:data
        }))
        .catch(err=>console.log(err.name))
    }
}

export function getAllDiets(){
    return (dispatch)=>{
        return fetch('http://localhost:3001/diets')
        .then(r=>r.json())
        .then(data=> dispatch({
            type: 'GET_ALL_DIETS',
            payload:data
        }))
    }
}

export function searchRecipes(recipe){
    
    return (dispatch)=>{
        dispatch(setStatus('...Cargando'))
        return fetch(`http://localhost:3001/recipes?name=${recipe}`)
        .then(r=>r.json())
        .then(data=> dispatch({
            type: 'SEARCH_RECIPES',
            payload:data
        }))
        .catch(e=>dispatch(setStatus('No se encontraron registros')))
    }
}

export function filterRecipes(data){
    setStatus('...Cargando')
    return {
        type: 'FILTER_RECIPES',
        payload:data
    }
}

export function sortRecipesAsc(campo){
   
    return {
        type: 'SORT_RECIPES_ASC',
        payload:campo
    }
}

export function sortRecipesDesc(campo){
    
    return {
        type: 'SORT_RECIPES_DESC',
        payload:campo
    }
}


export function createRecipe(data){
    return (dispatch)=>{
        
        return fetch("http://localhost:3001/recipes",
        {   method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
              }
        })
        .then(r=>r.json())
        .then(data=> dispatch({
            type: 'CREATE_RECIPE',
            payload:data
        }))
        .catch(e=>dispatch(setStatus('Error en alguno de los datos')))
    }
}

export function setStatus(payload){
    return {
        type: 'SET_STATUS',
        payload:payload
    }
}
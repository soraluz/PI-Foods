export function getAllRecipes(){
   
    return (dispatch)=>{
        return fetch("http://localhost:3001/recipes")
        .then(r=>r.json())
        .then(data=> dispatch({
            type: 'GET_ALL_RECIPES',
            payload:data
        }))
        .catch(e=>'Datos no encontrados')
    }
}

export function searchRecipes(recipe){
    console.log('recipe a buscar',recipe)
    return (dispatch)=>{
        return fetch(`http://localhost:3001/recipes?name=${recipe}`)
        .then(r=>r.json())
        .then(data=> dispatch({
            type: 'SEARCH_RECIPES',
            payload:data
        }))
        .catch(e=>'Datos no encontrados')   
    }
}

export function filterRecipes(data){
    
    return {
        type: 'FILTER_RECIPES',
        payload:data
    }
}

export function sortRecipesAsc(campo){
    console.log(campo)
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

export function getDetailRecipe(id){
    console.log('Ingreso a la action detalle con id',id)
    return (dispatch)=>{
        return fetch(`http://localhost:3001/recipes/${id}`)
        .then(r=>r.json())
        .then(data=> dispatch({
            type: 'GET_DETAIL_RECIPE',
            payload:data
        }))
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
export function createRecipe(data){
    return (dispatch)=>{
        console.log(data)
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
    }
}
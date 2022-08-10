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
    
    //return (dispatch)=>{
        //return fetch(`http://localhost:3001/recipes?name=${recipe}`)
        //.then(r=>r.json())
        //.then(data=> {
       return {
            type: 'SEARCH_RECIPES',
            payload:recipe
        }        
}

export function filterRecipes(data){
    
    return {
        type: 'FILTER_RECIPES',
        payload:data
    }
}

export function getDetailRecipe(){
    return (dispatch)=>{
        return fetch('')
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
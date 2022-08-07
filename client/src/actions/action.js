export function getAllRecipes(){
    console.log("Ingreso a la funcion getAllRecipes")
    return (dispatch)=>{
        return fetch("http://localhost:3001/recipes")
        .then(r=>r.json())
        .then(data=> dispatch({
            type: 'GET_ALL_RECIPES',
            payload:data
        }))
        .catch(e=>console.log('error',e))
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
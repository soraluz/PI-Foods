const initialState={
    recipes:[],
    filtro:[],
    busqueda:[],
    detail:{},
    diets:[]
}
export default function reducer(state=initialState,action){
    switch(action.type){
        case 'GET_ALL_RECIPES':

            return {
                ...state,
                recipes:action.payload
            }

        case 'SEARCH_RECIPES':
            if(state.filtro.length){
                return{
                    ...state,
                    busqueda:state.filtro.filter(recipe=>{ 
                    return recipe.title.toLowerCase().includes(action.payload.toLowerCase())
                    })
                }                
            }
            else
            return{
                    ...state,
                    busqueda:state.recipes.filter(recipe=>{ 
                    return recipe.title.toLowerCase().includes(action.payload.toLowerCase())
                    })
    
                }
                      
        case 'GET_DETAIL_RECIPE':
            return{
                ...state,
                detail:action.payload
            }
        case 'GET_ALL_DIETS':
            return{
                ...state,
                diets:action.payload
            }
        case 'FILTER_RECIPES':
            
            return{
                ...state,
                filtro:state.recipes.filter(recipe=>{ 
                    return recipe.diets?.includes(action.payload)|| 
                            recipe.vegetarian && action.payload=='vegetarian' ||
                            recipe.vegan && action.payload=='vegan' ||
                            recipe.glutenFree && action.payload=='gluten free' ||
                            recipe.dairyFree && action.payload=='dairy free' 

                }),
                busqueda:[]
            }
        case 'CREATE_RECIPE':
            return{
                ...state,
                recipes:state.recipes.concat(action.payload)
            }
        default: return state
    }

}
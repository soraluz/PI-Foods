const initialState={
    recipes:[],
    filtro:[],
    busqueda:[],
    ordenAsc:[],
    ordenDesc:[],
    detail:{},
    diets:[],
    loading:true
}
export default function reducer(state=initialState,action){
    switch(action.type){
        case 'GET_ALL_RECIPES':
        console.log('ingreso al reducer',action.payload)
            return {
                ...state,
                recipes:action.payload,
                filtro:action.payload,
                busqueda:[],
                ordenAsc:[],
                ordenDesc:[],
                loading:false
            }
                              
        case 'GET_DETAIL_RECIPE':
            console.log('Ingreso al reduce de detalle',action.payload)
            return{
                ...state,
                detail:action.payload
            }
        case 'GET_ALL_DIETS':
              return{
                ...state,
                diets:action.payload
            }

        case 'SEARCH_RECIPES':
             console.log('action.payload',action.payload)
                 return{
                       ...state,
                        busqueda:action.payload,
                        ordenAsc:[],
                        ordenDesc:[]
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
                busqueda:[],
                ordenAsc:[],
                ordenDesc:[]
            }

        case 'SORT_RECIPES_ASC':
            if(action.payload=='Nombre'){
                return{
                    ...state,
                    ordenAsc: state.filtro.sort((a,b)=>{
                        if (a.title < b.title) {
                            return -1;
                          }
                          if (a.title > b.title) {
                            return 1;
                          }
                          // a must be equal to b
                          return 0;
                    }),
                    ordenDesc:[]
                }
            }
            else if(action.payload=='Health Score'){
                
                return{
                    ...state,
                    ordenAsc: state.filtro.sort((a,b)=>{
                        if (a.healthScore < b.healthScore) {
                            return -1;
                          }
                          if (a.healthScore > b.healthScore) {
                            return 1;
                          }
                          // a must be equal to b
                          return 0;
                    }),
                    ordenDesc:[]
                }
            }
        

        case 'SORT_RECIPES_DESC':
            if(action.payload=='Nombre'){
             return{
                ...state,
                ordenDesc: state.filtro.sort((a,b)=>{
                    if (a.title > b.title) {
                        return -1;
                      }
                      if (a.title < b.title) {
                        return 1;
                      }
                      // a must be equal to b
                      return 0;
                }),
                ordenAsc:[]

             }
          }
          else if(action.payload=='Health Score'){
            return{
                ...state,
                ordenDesc: state.filtro.sort((a,b)=>{
                    if (a.healthScore > b.healthScore) {
                        return -1;
                      }
                      if (a.healthScore < b.healthScore) {
                        return 1;
                      }
                      // a must be equal to b
                      return 0;
                }),
                ordenAsc:[]
            }
          }

        case 'CREATE_RECIPE':
            return{
                ...state,
                recipes:state.recipes.concat(action.payload)

            }
        default: return state
    }

}
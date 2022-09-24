const initialState={
    recipes:[],
    ordenamiento:[],
    filtro:[],
    busqueda:[],   
    detail:{},
    diets:[],
    loading:false,
    
}
export default function reducer(state=initialState,action){
    switch(action.type){
        case 'GET_ALL_RECIPES':
       
            return {
                ...state,
                recipes:action.payload,
                filtro:action.payload,
             //   busqueda:[],
             //  ordenamiento:[],
               detail:{},
                loading:false
            }
                              
        case 'GET_DETAIL_RECIPE':
            
            return{
                ...state,
                detail:action.payload,
                loading:false
            }
        case 'GET_ALL_DIETS':
              return{
                ...state,
                diets:action.payload
            }

        case 'SEARCH_RECIPES':
            
                 return{
                       ...state,
                        busqueda:action.payload,
                        ordenamiento:[],
                        filtro:[],
                        loading:false
                    }    
                            

        case 'FILTER_RECIPES':

            let resultado=state.recipes.filter(recipe=>{ 
                return recipe.diets?.includes(action.payload)|| 
                        (recipe.vegetarian && action.payload==='vegetarian') ||
                        (recipe.vegan && action.payload==='vegan')||
                        (recipe.glutenFree && action.payload==='gluten free')||
                        (recipe.dairyFree && action.payload==='dairy free')

            })
            
            if(resultado.length){
                return{
                    ...state,
                    filtro:resultado,
                    busqueda:[],
                    ordenamiento:[],
                    loading:false
                }
            }
            else{
                return{
                    ...state,
                    filtro:[],
                    busqueda:[],
                    ordenamiento:[],
                    loading:'No se encontraron los registros'
                }
            }
            
            

        case 'SORT_RECIPES_ASC':
            let asc=[...state.filtro]
            if(action.payload==='Nombre'){
                return{
                    ...state,
                    ordenamiento: asc.sort((a,b)=>{
                        if (a.title.toUpperCase() < b.title.toUpperCase()) {
                            return -1;
                          }
                          if (a.title.toUpperCase() > b.title.toUpperCase()) {
                            return 1;
                          }
                          // a must be equal to b
                          return 0;
                    }),
                    //ordenDesc:[],
                   //loading:false
                }
            }
            else if(action.payload==='Health Score'){
                
                return{
                    ...state,
                    ordenamiento: asc.sort((a,b)=>{
                        if (a.healthScore < b.healthScore) {
                            return -1;
                          }
                          if (a.healthScore > b.healthScore) {
                            return 1;
                          }
                          // a must be equal to b
                          return 0;
                    }),
                  // ordenDesc:[],
                  //  loading:false
                }
            }
        

        case 'SORT_RECIPES_DESC':   
            const desc=[...state.filtro]
            if(action.payload==='Nombre'){
             return{
                ...state,
                ordenamiento: desc.sort((a,b)=>{
                    if (a.title.toUpperCase() > b.title.toUpperCase()) {
                        return -1;
                      }
                      if (a.title.toUpperCase() < b.title.toUpperCase()) {
                        return 1;
                      }
                      // a must be equal to b
                      return 0;
                }),
                //ordenAsc:[],
               // loading:false
             }
          }
          else if(action.payload==='Health Score'){
            return{
                ...state,
                ordenamiento: desc.sort((a,b)=>{
                    if (a.healthScore > b.healthScore) {
                        return -1;
                      }
                      if (a.healthScore < b.healthScore) {
                        return 1;
                      }
                      // a must be equal to b
                      return 0;
                }),
                //ordenAsc:[],
             //   loading:false
            }
          }

        case 'CREATE_RECIPE':
            let registro=state.recipes.concat(action.payload)
            return{
                ...state,
                recipes:registro,
                loading:'Receta creada correctamente'
            }
      
        case 'SET_STATUS':
            return{
                ...state,
                loading:action.payload
            }   
        default: return state

    }

}
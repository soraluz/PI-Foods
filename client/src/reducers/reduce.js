const initialState={
    recipes:[],
    recipe:{},
    detail:{}
}
export default function reducer(state=initialState,action){
    switch(action.type){
        case 'GET_ALL_RECIPES':
            return {
                ...state,
                recipes:action.payload
            }

        case 'GET_DETAIL_RECIPE':
            return{
                ...state,
                detail:action.payload
            }
        case 'CREATE_RECIPE':
            return{
                ...state,
                recipe:action.payload
            }
        default: return state
    }

}
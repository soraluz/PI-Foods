import Recip from './Recip'
export default function Recipes({recetas}){
    return <div>
    {
    recetas?.map((receta)=>{
            return <Recip receta={receta} />
        })
    }
    </div>
}
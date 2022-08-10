export default function Recip({receta}){
    return <div>
            <h1>{receta.title}</h1>
            {receta.image?<img src={receta.image} alt='Imagen no encontrada' />:null}
            {
                receta.diets?.map(tipo=>{
                    return <p>{tipo}</p>
            })}
   </div>
}
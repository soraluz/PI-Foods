export default function Recip({receta}){
    return <div>
            <p>{receta.title}</p>
            <img src={receta.image} alt='Imagen no encontrada' />
   </div>
}
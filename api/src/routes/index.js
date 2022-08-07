const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, Diet } = require('../db')
const axios = require("axios")
const {
     API_KEY,
   } = process.env;


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', async function(req,res){
const {name}= req.query
     try{
          if(name){
          const resultado= await  axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`)
          const filtro= resultado.data.results.map(receta=>{

                   return {
                            title:receta.title,
                            image:receta.image
                   } 
                   }).filter((receta)=>{
                         return receta.title.toLowerCase().includes(name.toLowerCase())
                   })
               console.log(filtro)      
          
              if(filtro.length) {
                    res.json(filtro)                  
               }
               else res.send('No se encontraron resultados con el nombre de receta ingresado')
          }
          else res.send('Debe pasa por parametro el nombre a buscar')
     }
    catch(e){
     console.log(e)
    }
})

router.get('/recipes/:idReceta',async function(req,res){
     const {idReceta}=req.params
     //ejem idReceta=716429, 715538
     try{
               const resultado= axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY}`)
               const filtro=r.data.map((r)=>{
                    return {
                         image:r.image,
                         title:r.title,
                         dishTypes:dishTypes,
                         diets:diets,
                         summary:summary,
                         healthScore:healthScore,
                         steps:instructions
                    }
               })
               if(resultado) res.json(filtro)
               else console.log('Id invalida')
           
     }catch(e){
          console.log('Error',e)
     }
    

})

router.post('/recipes', async function(req,res){
     const {name, summary, healthScore,steps}=req.body;

     try{
          if(!name || !summary) return res.status(404).send("Falta enviar datos que son neesarios")
          const receta=await Recipe.create(
               {
               name:name,
               summary:summary,
               healthScore:healthScore,
               steps:steps
          })
          res.status(201).json(receta)
     }catch(e){
          res.status(404).send("Error en alguno de los datos provistos")
     }    

})

router.get('/diets',async function(req,res){
     try{
          const dietas=await Diet.findAll()
          if(!dietas.length){
               //buscar api
              await Diet.bulkCreate([
                    {name:"Gluten Free"},
                    {name: "Ketogenic"},
                    {name: "Vegetarian"},
                    {name: "Lacto-Vegetarian"},
                    {name: "Ovo-Vegatarian"},
                    {name: "Vegan"},
                    {name: "Pescetarian"},
                    {name: "Paleo"},
                    {name: "Primal"},
                    {name: "Low FODMAP"},
                    {name: "Whole30"}              
               ])
               res.json(dietas)
          }
          else res.json(dietas)
     }catch(e){
          res.status(404).send("Error en alguno de los datos provistos")
     }
    
})

module.exports = router;


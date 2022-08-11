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
          let resultado;
          let api= await  axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
   
          api= api.data.results.map(receta=>{

                   return {
                            title:receta.title,
                            image:receta.image,
                            diets:receta.diets,
                            vegetarian:receta.vegetarian,
                            vegan:receta.vegan,
                            glutenFree:receta.glutenFree,
                            dairyFree:receta.dairyFree
                   } 
                   })
          let bd=await Recipe.findAll()
          bd=bd.map(receta=>{
               return {
                    title:receta.name,
                    //image:receta.image
                   // diets:receta.diets
               }
          })
          resultado=api.concat(bd)
               //Si se envia query
               if(name){
               
               const filtro=resultado.filter((receta)=>{
                         return receta.title.toLowerCase().includes(name.toLowerCase())
                   })
          
              if(filtro.length) {
                    res.json(filtro)                  
               }
               else{ res.send('No se encontraron resultados con el nombre de receta ingresado')}
          }
          else {
               //Envio todos los resultados
              if(resultado){
               res.json(resultado)
              }
               else{ res.send('No se encontraron resultados con el nombre de receta ingresado')}
          }
     }
    catch(e){
     res.send("Error en los datos")
    }
})

router.get('/recipes/:idReceta',async function(req,res){
     const {idReceta}=req.params
     //ejem idReceta=716429, 715538
     try{
               const resultado=await axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY}`)
               const filtro=resultado.data.map((r)=>{
                    return {
                         image:r.image,
                         title:r.title,
                         dishTypes:r.dishTypes,
                         diets:r.diets,
                         summary:r.summary,
                         healthScore:r.healthScore,
                         steps:r.instructions
                    }
               })
               if(resultado) res.json(filtro)
               else res.send("No se encontraron resultados con el ID enviado")
           
     }catch(e){
          res.send("Error en alguno de los datos")
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
                    {name:"gluten free"},
                    {name:"dairy free"},
                    {name: "lacto ovo vegetarian"},
                    {name: "vegetarian"},
                    {name: "vegan"},
                    {name: "paleolithic"},
                    {name: "primal"},
                    {name: "whole 30"},
                    {name: "pescatarian"},
                    {name: "ketogenic"},    
                    {name: "fodmap friendly"}                     
                  
               ])
               res.json(dietas)
          }
          else res.json(dietas)
     }catch(e){
          res.status(404).send("Error en alguno de los datos provistos")
     }
    
})

module.exports = router;


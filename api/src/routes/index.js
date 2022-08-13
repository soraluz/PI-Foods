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
          let api= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`)
          api= api.data.results.map(receta=>{
              
                   return {
                           
                            id:receta.id,
                            title:receta.title,
                            image:receta.image,
                            healthScore:receta.healthScore,
                            diets:receta.diets,
                            vegetarian:receta.vegetarian,
                            vegan:receta.vegan,
                            glutenFree:receta.glutenFree,
                            dairyFree:receta.dairyFree
                   } 
                   })
          let bd=await Recipe.findAll()
          bd=bd?.map(receta=>{
               return {
                    id:receta.id,
                    title:receta.name,
                    //image:receta.image
                    diets:receta.diets
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
     res.redirect('/error')
    }
})

router.get('/recipes/:idReceta',async function(req,res){
     const {idReceta}=req.params
     console.log('id',idReceta)
     //ejem idReceta=716429, 715538
     try{     
         //Buscamos en la Api
         if(idReceta.includes('-')){

          console.log('entro BD')
          const result=await Recipe.findByPk(idReceta)
         
          if(result){
               
               const resultadoBD=await Recipe.findOne({
                    where:{
                         id:idReceta
                    },include:Diet})
                    console.log(resultadoBD.toJSON())
               return res.json(resultadoBD)
               }
         
          }
                    
          else{      //Buscamos en la Base de Datos    
               
               console.log("Ingresamos a la API")
               const resultadoApi=await axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY}`)
               console.log('resultadoApi',resultadoApi.data)
                         const receta= {
                              image:resultadoApi.data.image,
                              title:resultadoApi.data.title,
                              dishTypes:resultadoApi.data.dishTypes,
                              summary:resultadoApi.data.summary,
                              healthScore:resultadoApi.data.healthScore,
                              steps:resultadoApi.data.instructions,
                              diets:resultadoApi.data.diets,
                              vegetarian:resultadoApi.data.vegetarian,
                              vegan:resultadoApi.data.vegan,
                              glutenFree:resultadoApi.data.glutenFree,
                              dairyFree:resultadoApi.data.dairyFree
                         }
                         res.json(receta)
               }
     }catch(e){
          res.send("No se encontraron los datos con el ID enviado")
     }
})

router.post('/recipes', async function(req,res){
     const {name, summary, healthScore,steps,diets}=req.body;
     console.log(diets)

     try{
          if(!name || !summary) return res.status(404).send("Falta enviar datos que son neesarios")
          const receta=await Recipe.create(
               {
               name:name,
               summary:summary,
               healthScore:healthScore,
               steps:steps
          })
          receta.addDiet(diets)
          
          res.status(201).json(receta)
     }catch(e){
          res.redirect('/home')
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
          res.redirect('/home')
     }
})
router.get('*',function(req,res){
     res.send("Esta ruta no existe")
})

module.exports = router;


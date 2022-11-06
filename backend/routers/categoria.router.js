const status_HTTP=require('../constantes/http_status.js');

const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/categoria');
const autenticacion=require('../middleware/auth_middleware');

router.use(autenticacion.verify);

router.route('')
    .get(async(req,res)=>{
        try{
            const results = await CategoriaController.getAllCategories();
            res.status(status_HTTP.HTTP_OK).json(results);
      
        }catch(error){
          res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error del servidor. Intente nuevamente más tarde.")
        }
    })
    .post(async(req,res)=>{

        let nombre = req.body.nombre;
        try{
            const result = await CategoriaController.addCategory(nombre);
            if(result){
                res.status(status_HTTP.HTTP_RESOURCE_CREATED).send("Categoría creada correctamente");
            }else{
              res.status(status_HTTP.HTTP_RESOURCE_CONFLICT).send("La Categoría ingresada ya existe.");
            }
        }catch(Exception){
            res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al crear la Categoría.Intente nuevamente mas tarde.");
        }    
    })
    .put(async(req,res)=>{
        const categoria = {...req.body };
        try{          
          const result = await CategoriaController.editCategory(categoria);
          if(result){
            res.status(status_HTTP.HTTP_OK).json(result);
          }else{
            res.status(status_HTTP.HTTP_NOT_FOUND).send("La categoría no existe.");
          }  
        }catch(error){  
           res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al editar la categoría. Intente nuevamente mas tarde.");
        }
    });
router.route('/tags')
    .get(async(req,res)=>{
        try{
          categoria = await CategoriaController.getCategoryTags();
          res.status(status_HTTP.HTTP_OK).json(categoria);
        }catch(error){
          console.log(error);
          res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al obtener la categoria.");
        }
    });    
router.route('/:categoriaId')
    .get(async(req,res)=>{
        let categoriaId =  req.params.categoriaId;
        try{
          categoria = await CategoriaController.getCategory(categoriaId);
          res.status(status_HTTP.HTTP_OK).json(categoria);
        }catch(error){
          res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al obtener la categoria.");
        }
    })
    .delete(async(req,res)=>{
        try{
            const result = await CategoriaController.deleteCategory(req.params.categoriaId);
            if(result){
                res.status(status_HTTP.HTTP_OK).send("Categoría borrada.")
            }else{
                res.status(status_HTTP.HTTP_NOT_FOUND).send("No se ha podido eliminar la categoría.")
            }
        }catch(error){
            res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al borrar la categoría.")
        }
    });
router.route('/:categoriaId/productos')
    .get(async(req,res)=>{
        let categoriaId =  req.params.categoriaId;        
        try{
          categoria = await CategoriaController.getCategory(categoriaId);
          productosCategoria=await CategoriaController.getCategoryProducts(categoria);
          res.status(status_HTTP.HTTP_OK).json(productosCategoria);
        }catch(error){
          res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al obtener los productos de la categoría.");
        }
    });

module.exports=router;
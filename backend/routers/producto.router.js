const express = require('express');
const status_HTTP=require('../constantes/http_status.js');
const router = express.Router();
const ProductoController = require('../controllers/producto');
const autenticacion=require('../middleware/auth_middleware');

router.use(autenticacion.verify);

router.route('')
    .get(async(req,res)=>{
        try{
            const results = await ProductoController.getAllProducts();
            res.status(status_HTTP.HTTP_OK).json(results);
      
        }catch(error){
            res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error del servidor. Intente nuevamente más tarde.")
        }
    })
    .post(async(req,res)=>{
        let categoria_id = req.body.categoria_id;
        let nombre = req.body.nombre;
        let descripcion = req.body.descripcion;
        let imagen = req.body.imagen;
        let precio = req.body.precio;
        try{
            const result = await ProductoController.addProducto(categoria_id,nombre,descripcion,imagen,precio);
            if(result){
                res.status(status_HTTP.HTTP_RESOURCE_CREATED).send("Producto creado correctamente");
            }else{
              res.status(status_HTTP.HTTP_RESOURCE_CONFLICT).send("No existe la categoria ingresada para el producto");
            }
        }catch(Exception){
            console.log(Exception);
            res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al crear el producto.Intente nuevamente mas tarde.");
        }    
    })
    .put(async(req,res)=>{
        const producto = {...req.body };
        try{          
          const result = await ProductoController.editProduct(producto);
          if(result){
            res.status(status_HTTP.HTTP_OK).json(result);
          }else{
            res.status(status_HTTP.HTTP_NOT_FOUND).send("El producto no existe.");
          }  
        }catch(error){  
           res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al editar el Producto. Intente nuevamente mas tarde.");
        }
    });
router.route('/:productoId')
    .get(async(req,res)=>{
        let productoId =  req.params.productoId;
        try{
          product = await ProductoController.getProduct(productoId);
          res.status(status_HTTP.HTTP_OK).json(product);
        }catch(error){
          res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al obtener el producto.");
        }
    })
    .delete(async(req,res)=>{
        try{
            const result = await ProductoController.deleteProduct(req.params.productoId);
            if(result){
                res.status(status_HTTP.HTTP_OK).send("Producto borrado.")
            }else{
                res.status(status_HTTP.HTTP_NOT_FOUND).send("No se ha podido eliminar el producto.")
            }
        }catch(error){
            res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al borrar el producto.")
        }
    });
router.get('/search/:parametroBusqueda',
    async (req, res) => {
        const searchRegex = new RegExp(req.params.parametroBusqueda, 'i');
        try{
            const productos = await ProductoController.getByName({nombre: {$regex:searchRegex}})
            res.status(status_HTTP.HTTP_OK).send(productos);
        }catch(error){
            res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al obtener productos por nombre.")
        }
    }
)
module.exports=router;
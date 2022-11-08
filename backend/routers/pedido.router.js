const status_HTTP=require('../constantes/http_status.js');
const pedidoEstatus=require('../constantes/pedido_status.js')
const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/pedido');
const autenticacion=require('../middleware/auth_middleware');

router.use(autenticacion.verify);

router.route('')
    .get(async (req,res ) => {
        try{
            const pedido= await PedidoController.getPedidoUsuarioActual(req.user.id);
            if(pedido)
                res.status(status_HTTP.HTTP_OK).send(pedido);
            else 
                res.status(status_HTTP.HTTP_NOT_FOUND).send();
        }catch(error){
            res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al recuperar el pedido.Intente nuevamente mas tarde.");
        }
    })
    .post(async(req,res)=>{
        const pedido = req.body;
        if(pedido.items.length <= 0){
            res.status(status_HTTP.HTTP_BAD_REQUEST).send('El Carro de Compras esta vacio');
            return;
        } 
        try{
            const result = await PedidoController.generarPedido(pedido,req.user.id);
            if(result){
                res.status(status_HTTP.HTTP_RESOURCE_CREATED).send(result);
            }else{
                res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al registrar el pedido.");
            }
        }catch(error){
            res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al registrar el pedido.Intente nuevamente mas tarde.");
        }
    })
    .put(async(req,res)=>{
        try{        
            const pedido= await PedidoController.getPedidoUsuarioActual(req.user.id);
            if(!pedido){
                res.status(status_HTTP.HTTP_BAD_REQUEST).send("Pedido no Encontrado.");
                return
            }
            const pedidoConfirmado= await PedidoController.ConfirmarPedido(pedido);
            if(pedidoConfirmado){
                res.status(status_HTTP.HTTP_OK).send(pedidoConfirmado._id);
            }else{
                res.status(status_HTTP.HTTP_RESOURCE_CONFLICT).send("No se pudo confirmar el pedido.");
            }            
        }catch(error){
           res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al actualizar el Pedido. Intente nuevamente mas tarde.");
        }
    });
router.route('/seguimiento')
    .get(async (req,res ) => {        
        try{
            const pedido= await PedidoController.getPedidosSeguimiento(req.user.id);
            if(pedido)
                res.status(status_HTTP.HTTP_OK).send(pedido);
            else 
                res.status(status_HTTP.HTTP_NOT_FOUND).send();
        }catch(error){
            res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al recuperar los pedidos.Intente nuevamente mas tarde.");
        }
    });    
router.route('/:pedidoId')
    .get(async(req,res)=>{
        let pedidoId =  req.params.pedidoId;
        try{
          pedido = await PedidoController.getPedido(pedidoId);
          res.status(status_HTTP.HTTP_OK).json(pedido);
        }catch(error){
          res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al obtener el pedido.");
        }
    });
module.exports=router;
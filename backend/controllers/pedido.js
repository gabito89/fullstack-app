require('mongoose');
const EstadoPedido= require('../constantes/pedido_status');
const Pedido = require('../models/pedido');

const getPedidoUsuarioActual = async (user_id) => {
    return await Pedido.findOne({ usuario: user_id, estado: EstadoPedido.NUEVO});
}

const generarPedido = async (pedido,userId) => {
    await Pedido.deleteOne({usuario:userId,estado:EstadoPedido.NUEVO});
    const nuevoPedido=new Pedido({...pedido,usuario:userId});
    await nuevoPedido.save();
    return nuevoPedido;
}

const ConfirmarPedido=async (pedido)=>{
    const result = await Pedido.findByIdAndUpdate(pedido.id,{$set:{estado:EstadoPedido.PEDIDO}},{new:true});
    return result;
}

const getPedido = async(id) => {

    const pedido = await Pedido.findById(id);
    return pedido;
}

const getPedidosSeguimiento = async(user_id) => {

    const pedido = await Pedido.find({usuario:user_id});
    return pedido;
}
module.exports = { getPedidoUsuarioActual, generarPedido,ConfirmarPedido,getPedido,getPedidosSeguimiento}
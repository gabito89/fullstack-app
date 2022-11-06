const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Producto=require('./producto');
const pedidoItemSchema = new Schema({
	producto:{
		type: Producto.productoSchema,
		required:true
	},
    precio:{
		type: Number,
		required:true
	},
    cantidad:{
		type: Number,
		required:true
	},
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
    }
});


const PedidoItem = mongoose.model('pedido_item',pedidoItemSchema);
module.exports = {PedidoItem,pedidoItemSchema};
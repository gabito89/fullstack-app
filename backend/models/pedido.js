const mongoose = require('mongoose');
const PedidoEstatus = require('../constantes/pedido_status.js');
const Schema = mongoose.Schema;
const { pedidoItemSchema } = require('./pedido_item.js');
const pedidoSchema = new Schema({
	nombre: {
		type: String, 
		required: true
	},
	direccion: {
		type: String, 
		required: true
	},
	precioTotal:{
		type: Number,
		required:true
	},
    items:{
		type: [pedidoItemSchema],required:true
	},
	estado:{
		type: String,
        required:true,
		default:PedidoEstatus.NUEVO
    },
	usuario:{
		type: Schema.Types.ObjectId,
		required:true
	}
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
    }
});


const Pedido = mongoose.model('pedido',pedidoSchema);
module.exports = Pedido;
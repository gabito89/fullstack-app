const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Categoria=require('./categoria');
const productoSchema = new Schema({
	categoria:{
		type: Categoria.categoriaSchema,
		required:true
	},
    nombre:{
		type: String,
		required:true
	},
	descripcion:{
		type: String,
		required:true
    },
	imagen:{
		type:String,
		required:true
	},
    precio:{
		type: Number,
		required:true
	}
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
    }
});


const Producto = mongoose.model('producto',productoSchema);
module.exports = {Producto,productoSchema};
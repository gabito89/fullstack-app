const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categoriaSchema = new Schema({
	nombre:{
		type: String,
		required:true
    },
    estado:{
        type: Boolean,
        required:true,
        default:true
    }
}, { timestamps: true } );


const Categoria = mongoose.model('categoria',categoriaSchema);
module.exports = {Categoria,categoriaSchema};
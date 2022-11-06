const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usuarioSchema = new Schema({

	email:{
		type: String,
		required:true,
		index: {unique: true, dropDups: true}
	},
    clave:{
		type: String,
		required:true
	},
	nombre:{
		type: String,
		required:true
    },
    direccion:{
		type: String,
		required:true
	},
	estado:{
		type: Boolean,
		required:true,
		default:true
	},
	esAdministrador:{
		type: Boolean,
		required:true,
		default:false
	}
}, { timestamps: true } ).set('toJSON',{
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
        delete object.clave;
    }
});


const Usuario = mongoose.model('usuario',usuarioSchema);
module.exports = Usuario;
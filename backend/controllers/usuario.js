require('mongoose');
const Usuario = require('../models/usuario');
const jwt=require('jsonwebtoken');

const addUser = async (email,nombre,direccion,clave) => {

    let existUser = await Usuario.findOne({ email: email });
    if(!existUser) {

        const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(clave)
        .digest('hex');
        
        const usr = new Usuario(
            {              
                email: email,
                clave:cryptoPass,
                nombre: nombre,
                direccion:direccion,
                estado:true,
                esAdministrador:false
            }
        );

        let user = await usr.save();
        return { user }; 

    }else{
        return false;
    }
}   

const getAllUsers = async () => {

    const users = await Usuario.find({});

    return users;
}

const getUser = async(id) => {

    const user = await Usuario.findById(id);
    return user;
}
const getLogin = async(email,password) => {
    const  clave= require('crypto')
    .createHash('sha256')
    .update(password)
    .digest('hex');
    return await Usuario.findOne({email , clave,estado:true});
}

const editUser = async(user) => {
    if(user.clave){
        const cryptoPass = require('crypto')
        .createHash('sha256')
        .update(user.clave)
        .digest('hex');
        user.clave=cryptoPass;
    }        
    const result = await Usuario.findByIdAndUpdate(user._id,user,{new:true});

    return result;
}

const deleteUser = async(id) => {

    const result = await Usuario.findByIdAndUpdate(id,{$set:{estado:false}},{new:true});

    return result;
}

const generateTokenReponse = (user) => {
    const token = jwt.sign({
      id: user.id, email:user.email, esAdministrador: user.esAdministrador
    },process.env.JWT_SECRET,{
      expiresIn:"30d"
    });
  
    return {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      direccion: user.direccion,
      esAdministrador: user.esAdministrador,
      token: token
    };
  }

module.exports = { addUser, getAllUsers, getUser,getLogin, editUser, deleteUser, generateTokenReponse }
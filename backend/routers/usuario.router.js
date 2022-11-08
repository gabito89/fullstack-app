const status_HTTP=require('../constantes/http_status.js');
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuario');
const autenticacion=require('../middleware/auth_middleware');

router.get("/precarga", 
    async (req, res) => {
       const cantidadUsuarios = await UsuarioController.getAllUsers();
       if(cantidadUsuarios> 0){
         res.status(status_HTTP.HTTP_RESOURCE_CONFLICT).send("Precarga ya realizada");
         return;
       }
       await UsuarioController.addUser("prueba@prueba.com","admin","admin","1234",true);
       res.status(status_HTTP.HTTP_OK).send("Precarga Completa");
   }
);
  
router.post("/login",
    async (req, res) => {
        const user = await UsuarioController.getLogin(req.body.email , req.body.clave);
        
        if(user) {
        res.status(status_HTTP.HTTP_OK).send(UsuarioController.generateTokenReponse(user));
        }
        else{
            res.status(status_HTTP.HTTP_BAD_REQUEST).send("Usuario o Contraseña Incorrecto");
        }

    }
)

router.post('/registro',
    async (req, res) => {
      let email = req.body.email;
      let nombre = req.body.nombre;
      let direccion = req.body.direccion;
      let clave = req.body.clave;
      try{
          const result = await UsuarioController.addUser(email,nombre,direccion,clave,false);
          if(result){
              res.status(status_HTTP.HTTP_RESOURCE_CREATED).send(UsuarioController.generateTokenReponse(result.user));
          }else{
            res.status(status_HTTP.HTTP_RESOURCE_CONFLICT).send("El Usuario ya existe.");
          }
      }catch(Exception){
          res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al crear el Usuario.Intente nuevamente mas tarde.");
      }
    }
  )

router.use(autenticacion.verify).route('')
  .get(async(req,res)=>{
      try{
          const results = await UsuarioController.getAllUsers();
          res.status(status_HTTP.HTTP_OK).json(results);
      }catch(error){
          res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error del servidor. Intente nuevamente más tarde.")
      }
  })
  .post(async(req,res)=>{
      let email = req.body.email;
      let nombre = req.body.nombre;
      let direccion = req.body.direccion;
      let clave = req.body.clave;
      let admin = req.body.administrador;
      try{
          const result = await UsuarioController.addUser(email,nombre,direccion,clave,admin);
          if(result){
              res.status(status_HTTP.HTTP_RESOURCE_CREATED).send("Usuario Creado correctamente");
          }else{
            res.status(status_HTTP.HTTP_RESOURCE_CONFLICT).send("El Usuario ya existe.");
          }
      }catch(Exception){
          res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al crear el Usuario.Intente nuevamente mas tarde.");
      }   
  })
  .put(async(req,res)=>{
      const usuario = {...req.body };
      try{          
        const result = await UsuarioController.editUser(usuario);
        if(result){
          res.status(status_HTTP.HTTP_OK).json(result);
        }else{
          res.status(status_HTTP.HTTP_NOT_FOUND).send("El usuario no existe.");
        }  
      }catch(error){
         res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al editar el Usuario. Intente nuevamente mas tarde.");
      }
  });

router.use(autenticacion.verify).route('/:usuarioId')
  .get(async(req,res)=>{
      let usuarioId =  req.params.usuarioId;
      try{
        user = await UsuarioController.getUser(usuarioId);
        res.status(status_HTTP.HTTP_OK).json(user);
      }catch(error){
        res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al obtener el usuario.");
      }
  })
  .delete(async(req,res)=>{
      try{
          const result = await UsuarioController.deleteUser(req.params.usuarioId);
          if(result){
              res.status(status_HTTP.HTTP_OK).send("Usuario borrado.")
          }else{
              res.status(status_HTTP.HTTP_NOT_FOUND).send("No se ha podido eliminar el Usuario.")
          }
      }catch(error){
          res.status(status_HTTP.HTTP_SERVER_ERROR).send("Error al borrar el Usuario.")
      }
  });

module.exports=router;
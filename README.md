# UP-FullStackApp

# Nombre del Grupo
**Grupo 11**

# Integrante
**Alan Christian GABITO - N° Legajo 119519**

# Descripción del Negocio

El negocio elegido será un e-commerce. Este e-commerce va a contar con una lista de productos los cuales van a estar catalogados en diferentes categorias. A su vez, va a tener usuarios cuyos roles pueden ser administrador o usuario del e-commerce. Por ultimo va a poseer un carrito de compras en el cual se van a ir agregando los productos que el usuario desee comprar, para luego generar el pedido el cual posee los estados generado o pedido. 

# Tecnologias Utilizadas
- Express 
- MongoDB
- Autenticacion mediante JWT.
- Testing mediante Jest y Supertest.
- Angular.

# Inicio de aplicacion
- Ejecutar npm install en directorio backend.
- realizar copia de archivo .env.example y cambiarlo a .env
- configurar la uri de mongo en dicho archivo y la clave secreta de JWT.
- Para correr los test, ejecutar comando npm run test en el directorio backend.
- Ejecutar comando node index.js.
- Ejecutar por postman el metodo GET http://localhost:5000/usuarios/precarga, el cual genera un usuario por default en Mongo con email prueba@prueba.com y clave 1234, con permisos administrador.
- Con el server levantado, ejecutar npm install en directorio frontend. Luego comando ng serve -o.

# Endpoint:
Maquetado disponible en [Swagger](https://app.swaggerhub.com/apis/gabito89/EcommerceAPI/2.0.0)
## Recursos
-   Productos
    - id
    - categoria
    - nombre
    - descripcion
    - imagen
    - precio
-   Categorias
    - id
    - nombre
-   Pedido
    - id
    - nombre
    - direccion
    - precioTotal
    - items[]
    - estado    
    - usuario
-   PedidoItem
    - id
    - producto
    - precio   
    - cantidad
-   Usuarios
    - id
    - email
    - clave
    - nombre
    - direccion
    - esAdministrador
    - estado

## Planificacion de Endpoints
- producto
    - /productos - GET
    - /productos - POST
    - /productos - PUT
    - /productos/{productoId} - GET
    - /productos/{productoId} - DELETE
    - /productos/search/{parametroBusqueda} - GET
- categoria
    - /categorias - GET
    - /categorias - POST
    - /categorias - PUT
    - /categorias/tags - GET
    - /categorias/{categoriaId} - GET
    - /categorias/{categoriaId} - DELETE
    - /categorias/{categoriasId}/productos - GET
- pedidos
    - /pedidos - GET
    - /pedidos - POST
    - /pedidos - PUT
    - /pedidos/seguimiento - GET
    - /pedidos/{pedidoId} - GET    
- usuario
    - /usuarios - GET
    - /usuarios - POST
    - /usuarios - PUT
    - /usuarios/login - POST
    - /usuarios/registro - POST
    - /usuarios/precarga - GET
    - /usuarios/{usuarioId} - GET
    - /usuarios/{usuarioId} - DELETE
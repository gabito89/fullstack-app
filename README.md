# UP-FullStackApp

# Nombre del Grupo
**Grupo 11**

# Integrante
**Alan Christian GABITO - N° Legajo 119519**

# Descripción del Negocio

El negocio elegido será un e-commerce. Este e-commerce va a contar con una lista de productos los cuales van a estar catalogados en diferentes categorias. A su vez, va a tener una lista de usuarios cuyos roles pueden ser administrador o usuario del e-commerce. Por ultimo va a poseer un carrito de compras en el cual se van a ir agregando los productos que el usuario desee comprar, el cual posee los estados generado o confirmado. 

# Tecnologias Utilizadas

- Express 
- MongoDB
- Autenticacion mediante JWT.

# Endpoint:
Maquetado disponible en [Swagger](https://app.swaggerhub.com/apis/gabito89/EcommerceAPI/1.0.0)
## Recursos
-   Productos
    - id
    - categoria
    - nombre
    - descripcion
    - precio
-   Categorias
    - id
    - nombre
-   Carrito
    - id
    - usuario
    - productos[]
    - total
    - estado    
-   Usuarios
    - id
    - email
    - clave
    - nombre
    - apellido
    - rol
    - estado

## Planificacion de Endpoints
- producto
    - /productos - GET
    - /productos - POST
    - /productos - PUT
    - /productos/{productoId} - GET
    - /productos/{productoId} - DELETE
- categoria
    - /categorias - GET
    - /categorias - POST
    - /categorias - PUT
    - /categorias/{categoriaId} - GET
    - /categorias/{categoriaId} - DELETE
    - /categorias/{categoriasId}/productos - GET
- carrito
    - /carrito - GET
    - /carrito - POST
    - /carrito - PUT
    - /carrito/{carritoId} - GET
    - /carrito/{carritoId}/productos - PUT
    - /carrito/{carritoId} - DELETE    
- usuario
    - /usuarios - GET
    - /usuarios - POST
    - /usuarios - PUT
    - /usuarios/{usuarioId} - GET
    - /usuarios/{usuarioId} - DELETE
    - /usuarios/{usuarioId}/roles - PUT
- login
    - /auth/login - POST
    - /auth/logout - POST
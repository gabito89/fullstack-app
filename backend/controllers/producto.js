require('mongoose');
const Categoria = require('../models/categoria');
const Producto= require('../models/producto');

const addProducto = async (categoria_id,nombre,descripcion,imagen,precio) => {

    let existCategoria = await Categoria.Categoria.findById(categoria_id);   
    if(existCategoria) {
        const prod = new Producto.Producto(
            {              
                categoria: existCategoria,
                nombre: nombre,
                descripcion: descripcion,
                imagen:imagen,
                precio:precio
            }
        );
        let product = await prod.save();
        return { product };
    }else{
        return false;
    }
}   

const getAllProducts = async () => {

    const products = await Producto.Producto.find({});

    return products;
}

const getProduct = async(id) => {

    const product = await Producto.Producto.findById(id);
    return product;
}

const getByName = async(nameFilter) => {

    const productos = await Producto.Producto.find(nameFilter);
    return productos;
}

const editProduct = async(product) => {

    const result = await Producto.Producto.findByIdAndUpdate(product._id,product,{new:true});

    return result;
}

const deleteProduct = async(id) => {

    const result = await Producto.Producto.findByIdAndRemove(id);

    return result;
}

module.exports = { addProducto, getAllProducts, getProduct, editProduct, deleteProduct,getByName }
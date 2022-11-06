require('mongoose');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

const addCategory = async (nombre) => {

    let existCategoria = await Categoria.Categoria.findOne({ nombre: nombre });    
    if(!existCategoria) {
        const cat = new Categoria.Categoria(
            {              
                nombre: nombre
            }
        );

        let category = await cat.save();
        return { category }; 

    }else{
        return false;
    }
}   

const getAllCategories = async () => {

    const categories = await Categoria.Categoria.find();

    return categories;
}

const getCategoryTags = async () => {

    const tags = await Producto.Producto.aggregate([
        {
          $group:{
            _id: '$categoria._id',
            nombre:{$push:'$categoria.nombre'},
            cantidad: {$sum: 1}
          }
        },
        {
          $project:{
            _id: '$_id',
            nombre:{$first:'$nombre'},
            cantidad: '$cantidad',
          }
        }
      ]).sort({cantidad: -1});
  
    const all = {
      _id:'Todas',
      nombre : 'Todas',
      cantidad: await Producto.Producto.countDocuments()
    }
  
    tags.unshift(all);
    return tags;
}

const getCategory = async(id) => {

    const category = await Categoria.Categoria.findById(id);
    return category;
}

const editCategory = async(category) => {

    const result = await Categoria.Categoria.findByIdAndUpdate(category._id,category,{new:true});

    return result;
}

const deleteCategory = async(id) => {

    const result = await Categoria.Categoria.findByIdAndUpdate(id,{$set:{estado:false}},{new:true});
    return result;
}

const getCategoryProducts = async (category) => {
    let products = await Producto.Producto.find({});
    const categoryProducts=[];
    products.forEach(element => {
      if(element.categoria.id===category.id){
        categoryProducts.push(element);
      }
    });
    return categoryProducts;
}

module.exports = { addCategory, getAllCategories, getCategory, editCategory, deleteCategory,getCategoryProducts,getCategoryTags }
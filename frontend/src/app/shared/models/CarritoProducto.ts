import { Productos } from "./Productos";

export class CarritoProducto{
  constructor(public producto:Productos){}
  cantidad:number=1;
  precio:number=this.producto.precio;
}

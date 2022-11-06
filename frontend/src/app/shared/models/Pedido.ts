import { CarritoProducto } from "./CarritoProducto";

export class Pedido{
  id!:number;
  items!: CarritoProducto[];
  precioTotal!:number;
  nombre!: string;
  direccion!: string;
  estado!: string;
}

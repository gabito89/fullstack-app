import { Categoria } from "./Categoria";

export class Productos{
  id!:string;
  nombre!:string;
  descripcion!:string;
  precio!:number;
  categoria!: Categoria;
  imagen!:string;
}

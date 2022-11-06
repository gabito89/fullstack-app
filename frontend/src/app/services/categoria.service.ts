import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Categoria } from '../shared/models/Categoria';
import { CATEGORIA_ADD_ONE, CATEGORIA_DELETE_BY_ID, CATEGORIA_GET_ALL, CATEGORIA_GET_BY_ID, CATEGORIA_GET_TAGS } from '../shared/constants/urls';
import { ProductoService } from './producto.service';
import { Productos } from '../shared/models/Productos';
import { ICategoriaAdd } from '../shared/interfaces/ICategoriaAdd';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient, private productoService:ProductoService) { }

  getAllCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(CATEGORIA_GET_TAGS);
  }
  getAllProductosPorCategoria(categoria:string):Observable<Productos[]>{
    return categoria==="Todas"?
    this.productoService.getAll():
    this.http.get<Productos[]>(CATEGORIA_GET_BY_ID+categoria+'/productos');
  }

  getCategoriasList():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(CATEGORIA_GET_ALL);
  }

  borrarCategoria(id:String):Observable<string>{;
    return this.http.delete<string>(CATEGORIA_DELETE_BY_ID + id);;
  }
  addCategoria(categoria:ICategoriaAdd): Observable<Categoria>{
    return this.http.post<Categoria>(CATEGORIA_ADD_ONE, categoria);
  }
}

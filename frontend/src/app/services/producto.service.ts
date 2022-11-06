import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../shared/models/Categoria';
import { Productos } from '../shared/models/Productos';
import { PRODUCTOS_BY_NAME, PRODUCTOS_DELETE_BY_ID, PRODUCTOS_GET_BY_ID, PRODUCTOS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Productos[]>{
    return this.http.get<Productos[]>(PRODUCTOS_URL);
  }
  getAllProductosPorNombre(searchTerm:string){
    return this.http.get<Productos[]>(PRODUCTOS_BY_NAME+searchTerm);
  }
  getProductoById(productoId:string):Observable<Productos>{
    return this.http.get<Productos>(PRODUCTOS_GET_BY_ID+productoId);
  }
  borrarProducto(id:String):Observable<string>{;
    return this.http.delete<string>(PRODUCTOS_DELETE_BY_ID + id);;
  }
}

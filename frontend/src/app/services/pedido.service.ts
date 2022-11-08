import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PEDIDO_BY_ID, PEDIDO_CONFIRMAR, PEDIDO_INICIAR, PEDIDO_SEGUIMIENTO } from '../shared/constants/urls';
import { Pedido } from '../shared/models/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  crearPedido(pedido:Pedido){
    return this.http.post<Pedido>(PEDIDO_INICIAR, pedido);
  }

  getPedidoUsuarioActual():Observable<Pedido>{
    return this.http.get<Pedido>(PEDIDO_CONFIRMAR);
  }

  confirmar(order:Pedido):Observable<string>{;
    return this.http.put<string>(PEDIDO_CONFIRMAR,order);
  }
  getPedidoSeguimiento():Observable<Pedido[]>{
    return this.http.get<Pedido[]>(PEDIDO_SEGUIMIENTO);
  }
}

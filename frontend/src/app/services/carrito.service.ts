import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carrito } from '../shared/models/Carrito';
import { CarritoProducto } from '../shared/models/CarritoProducto';
import { Productos } from '../shared/models/Productos';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito:Carrito=this.getCarritoFromLocalStorage();
  private carritoSubject:BehaviorSubject<Carrito>=new BehaviorSubject(this.carrito);
  constructor() { }

  agregarAlCarrito(producto:Productos):void{
    let carritoItem=this.carrito.productos.find(item=>item.producto.id===producto.id);
    if(carritoItem)
      return;
    this.carrito.productos.push(new CarritoProducto(producto));
    this.setCarritoToLocalStorage();
  }

  sacarDelCarrito(productoId:string):void{
    this.carrito.productos=this.carrito.productos.filter(item=>item.producto.id!=productoId);
    this.setCarritoToLocalStorage();
  }

  cambiarCantidad(productoId:string,cantidad:number){
    let carritoProducto=this.carrito.productos.find(item=>item.producto.id===productoId);
    if(!carritoProducto) return;
    carritoProducto.cantidad=cantidad;
    carritoProducto.precio=cantidad*carritoProducto.producto.precio;
    this.setCarritoToLocalStorage();
  }

  vaciarCarrito(){
    this.carrito=new Carrito();
    this.setCarritoToLocalStorage();
  }

  getCarritoObservable():Observable<Carrito>{
    return this.carritoSubject.asObservable();
  }

  getCarrito(): Carrito{
    return this.carritoSubject.value;
  }

  private setCarritoToLocalStorage():void{
    this.carrito.precioTotal=this.carrito.productos.reduce((prevSum,itemActual)=> prevSum+itemActual.precio,0);
    this.carrito.cantidadTotal=this.carrito.productos.reduce((prevSum,itemActual)=>prevSum+itemActual.cantidad,0);
    const carritoJson=JSON.stringify(this.carrito);
    localStorage.setItem('carrito',carritoJson);
    this.carritoSubject.next(this.carrito);
  }

  private getCarritoFromLocalStorage():Carrito{
    const cartJson=localStorage.getItem('carrito');
    return cartJson? JSON.parse(cartJson):new Carrito();
  }
}

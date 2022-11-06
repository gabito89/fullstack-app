import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { Carrito } from 'src/app/shared/models/Carrito';
import { CarritoProducto } from 'src/app/shared/models/CarritoProducto';

@Component({
  selector: 'app-carrito-page',
  templateUrl: './carrito-page.component.html',
  styleUrls: ['./carrito-page.component.css']
})
export class CarritoPageComponent implements OnInit {
  carrito!: Carrito;
  constructor(private carritoService:CarritoService) {
    this.carritoService.getCarritoObservable().subscribe((carrito)=>{
      this.carrito=carrito;
    })
   }

  ngOnInit(): void {
  }
  sacarDelCarrito(carritoProducto:CarritoProducto){
    this.carritoService.sacarDelCarrito(carritoProducto.producto.id);
  }

  cambiarCantidad(carritoProducto:CarritoProducto,cantidadEnString:string){
    const cantidad = parseInt(cantidadEnString);
    this.carritoService.cambiarCantidad(carritoProducto.producto.id, cantidad);
  }

}

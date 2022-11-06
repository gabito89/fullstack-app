import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Productos } from 'src/app/shared/models/Productos';

@Component({
  selector: 'app-producto-page',
  templateUrl: './producto-page.component.html',
  styleUrls: ['./producto-page.component.css']
})
export class ProductoPageComponent implements OnInit {

  producto!:Productos;
  constructor(activatedRoute:ActivatedRoute,productoService:ProductoService,
    private carritoService:CarritoService,private router:Router) {
    activatedRoute.params.subscribe((params)=>{
      if(params.id)
        productoService.getProductoById(params.id).subscribe(serverProduct =>{
          this.producto=serverProduct;
        });
    })
   }

  ngOnInit(): void {
  }

  agregarAlCarrito(){
    this.carritoService.agregarAlCarrito(this.producto);
    this.router.navigateByUrl('/carrito');
  }
}

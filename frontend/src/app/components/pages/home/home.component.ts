import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Productos } from 'src/app/shared/models/Productos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productos:Productos[]=[];
  constructor(private productoService:ProductoService, categoriaSevice:CategoriaService ,activatedRoute:ActivatedRoute) {
    let productosObservable:Observable<Productos[]>;
    activatedRoute.params.subscribe((params)=>{
      if(params.searchTerm)
        productosObservable=productoService.getAllProductosPorNombre(params.searchTerm);
      else if(params.categoria)
        productosObservable=categoriaSevice.getAllProductosPorCategoria(params.categoria);
      else
        productosObservable=productoService.getAll();
        productosObservable.subscribe((serverProducts)=>{
          this.productos=serverProducts;
      })
    })
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProductoService } from 'src/app/services/producto.service';
import { Productos } from 'src/app/shared/models/Productos';

@Component({
  selector: 'app-productos-list-page',
  templateUrl: './productos-list-page.component.html',
  styleUrls: ['./productos-list-page.component.css']
})
export class ProductosListPageComponent implements OnInit {

  productos: Productos[]=[];
  constructor(private productoService:ProductoService,
    private toastrService: ToastrService,
    private router: Router) {
   }

  ngOnInit(): void {
    let productoObservable:Observable<Productos[]>;
    productoObservable=this.productoService.getAll();
    productoObservable.subscribe((serverProductos)=>{
      this.productos=serverProductos;
    });
  }

  sacarProducto(producto_id:string){
    this.productoService.borrarProducto(producto_id).subscribe({
      next:() => {
        this.router.navigateByUrl('/productos-list');
        this.toastrService.success(
          'Producto eliminado Correctamente',
          'Ok'
        );
      },
      error:(errorResponse) => {
        if(errorResponse.status==200){
          this.router.navigateByUrl('/',);
          this.toastrService.success(
            'Producto eliminado Correctamente',
            'Ok'
          );
        }else{
          this.toastrService.error(errorResponse.error, 'Producto');
        }
      }
    });
  }
}

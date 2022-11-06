import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/shared/models/Categoria';

@Component({
  selector: 'app-categorias-list-page',
  templateUrl: './categorias-list-page.component.html',
  styleUrls: ['./categorias-list-page.component.css']
})
export class CategoriasListPageComponent implements OnInit {

  categorias: Categoria[]=[];
  constructor(private categoriaService:CategoriaService,
    private toastrService: ToastrService,
    private router: Router) {
   }

  ngOnInit(): void {
    let categoriaObservable:Observable<Categoria[]>;
    categoriaObservable=this.categoriaService.getCategoriasList();
    categoriaObservable.subscribe((serverCategorias)=>{
      this.categorias=serverCategorias;
    });
  }

  sacarCategoria(categoria_id:string){
    this.categoriaService.borrarCategoria(categoria_id).subscribe({
      next:() => {
        this.router.navigateByUrl('/categorias-list');
        this.toastrService.success(
          'Categoría eliminada Correctamente',
          'Ok'
        );
      },
      error:(errorResponse) => {
        if(errorResponse.status==200){
          this.router.navigateByUrl('/',);
          this.toastrService.success(
            'Categoría eliminada Correctamente',
            'Ok'
          );
        }else{
          this.toastrService.error(errorResponse.error, 'Categoria');
        }
      }
    });
  }
}

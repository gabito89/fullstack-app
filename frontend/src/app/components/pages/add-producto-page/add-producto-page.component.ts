import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { IProductoAdd } from 'src/app/shared/interfaces/IProductoAdd';
import { Categoria } from 'src/app/shared/models/Categoria';

@Component({
  selector: 'app-add-producto-page',
  templateUrl: './add-producto-page.component.html',
  styleUrls: ['./add-producto-page.component.css']
})
export class AddProductoPageComponent implements OnInit {

  formularioRegistro!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  categorias: Categoria[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private productoService:ProductoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService:ToastrService,
    private categoriaService:CategoriaService,
  ) { }


ngOnInit(): void {
    let categoriaObservable:Observable<Categoria[]>;
    categoriaObservable=this.categoriaService.getCategoriasList();
    categoriaObservable.subscribe((serverCategorias)=>{
      this.categorias=serverCategorias;
    });
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      precio: [1, [Validators.required, Validators.min(1)]],
      categoria_id: ['', [Validators.required]]
    });
    this.returnUrl= this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.formularioRegistro.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.formularioRegistro.invalid) return;

    const fv= this.formularioRegistro.value;

    const prod :IProductoAdd = {
      nombre: fv.nombre,
      descripcion:fv.descripcion,
      precio:fv.precio,
      categoria_id: fv.categoria_id._id,
      imagen:'assets/generic.jpg'
    };

    this.productoService.addProducto(prod).subscribe({
      next:() => {
        this.router.navigateByUrl('productos-list');
        this.toastrService.success("Producto Creado", 'Producto');
      },
      error:(errorResponse) => {
        if(errorResponse.status==201){
          this.router.navigateByUrl('productos-list');
          this.toastrService.success("Producto Creado", 'Producto');
        }else{
          this.router.navigateByUrl('',);
          this.toastrService.error(errorResponse.error, 'Error');
        }
      }
    });
  }
}

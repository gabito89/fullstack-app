import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ICategoriaAdd } from 'src/app/shared/interfaces/ICategoriaAdd';
import { Categoria } from 'src/app/shared/models/Categoria';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent implements OnInit {

  formularioRegistro!:FormGroup;
  isSubmitted = false;

  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private categoriaService:CategoriaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]]
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
    const cat :ICategoriaAdd = {
      nombre: fv.nombre
    };

    this.categoriaService.addCategoria(cat).subscribe({
      next:() => {
        this.router.navigateByUrl('categorias-list');
        this.toastrService.success("Categoria Creada", 'Categoria');
      },
      error:(errorResponse) => {
        console.log(errorResponse);
        if(errorResponse.status==201){
          this.router.navigateByUrl('categorias-list');
          this.toastrService.success("Categoria Creada", 'Categoria');
        }else{
          this.router.navigateByUrl('',);
          this.toastrService.error(errorResponse.error, 'Error');
        }
      }
    })
  }

}

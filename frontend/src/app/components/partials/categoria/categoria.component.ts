import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/shared/models/Categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias?:Categoria[];
  constructor(categoriaService:CategoriaService) {
      categoriaService.getAllCategorias().subscribe(serverCategorias=>{
        this.categorias=serverCategorias;
      });
   }

  ngOnInit(): void {
  }

}

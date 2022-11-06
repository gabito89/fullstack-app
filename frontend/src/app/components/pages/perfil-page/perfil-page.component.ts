import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/shared/models/Usuario';

@Component({
  selector: 'app-perfil-page',
  templateUrl: './perfil-page.component.html',
  styleUrls: ['./perfil-page.component.css']
})
export class PerfilPageComponent implements OnInit {

  usuario!:Usuario;
  constructor(activatedRoute:ActivatedRoute,usuarioService:UsuarioService,
    private router:Router) {
      this.usuario=usuarioService.usuarioActual;
   }

  ngOnInit(): void {
  }
}

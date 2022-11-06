import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/shared/models/Usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  carritoCantidad=0;
  usuario!:Usuario;
  constructor(carritoService:CarritoService, private usuarioService:UsuarioService) {
    carritoService.getCarritoObservable().subscribe((nuevoCarrito)=>{
      this.carritoCantidad=nuevoCarrito.cantidadTotal;
    })
    usuarioService.usuarioObservable.subscribe((nuevoUsuario) => {
      this.usuario = nuevoUsuario;
    })

   }

  ngOnInit(): void {
  }
  logout(){
    this.usuarioService.logout();
  }

  get isAuth(){
    return this.usuario.token;
  }

  get isAdmin(){
    return this.usuario.esAdministrador;
  }
}

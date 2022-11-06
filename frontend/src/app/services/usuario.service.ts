import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { USUARIO_LOGIN,USUARIO_REGISTRO } from "../shared/constants/urls";
import { IUsuarioLogin } from "../shared/interfaces/IUsuarioLogin";
import { IUsuarioRegistro } from "../shared/interfaces/IUsuarioRegistro";
import { Usuario } from "../shared/models/Usuario";
import {ToastrService} from 'ngx-toastr';

const USER_KEY = 'usuario';
@Injectable({
  providedIn:'root'
})
export class UsuarioService
{
  private usuarioSubject=new BehaviorSubject<Usuario>(this.getUsuarioFromLocalStorage());
  public usuarioObservable:Observable<Usuario>;
  constructor(private http:HttpClient,private toastrService:ToastrService){
    this.usuarioObservable=this.usuarioSubject.asObservable();
  }

  public get usuarioActual():Usuario{
    return this.usuarioSubject.value;
  }

  login(usuarioLogin:IUsuarioLogin):Observable<Usuario>{
    return this.http.post<Usuario>(USUARIO_LOGIN, usuarioLogin).pipe(
      tap({
        next: (user) =>{
          this.setUsuarioLocalStorage(user);
          this.usuarioSubject.next(user);
          this.toastrService.success(
            `Bienvenido ${user.nombre}!`,
            'Logueo OK'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Logueo Incorrecto');
        }
      })
    );
  }

  register(usuarioRegistro:IUsuarioRegistro): Observable<Usuario>{
    return this.http.post<Usuario>(USUARIO_REGISTRO, usuarioRegistro).pipe(
      tap({
        next: (user) => {
          this.setUsuarioLocalStorage(user);
          this.usuarioSubject.next(user);
          this.toastrService.success(
            `Bienvenido ${user.nombre}`,
            'Registro Correcto'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Register Incorrecto')
        }
      })
    )
  }

  logout(){
    this.usuarioSubject.next(new Usuario());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUsuarioLocalStorage(user:Usuario){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUsuarioFromLocalStorage():Usuario{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as Usuario;
    return new Usuario();
  }

}

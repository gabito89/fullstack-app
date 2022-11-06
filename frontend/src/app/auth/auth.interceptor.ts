import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private usuarioService: UsuarioService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.usuarioService.usuarioActual;
    if(user.token)
    {
      request = request.clone({
        setHeaders:{
          authorization: user.token
        }
      })
    }
    return next.handle(request);
  }
}

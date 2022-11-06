import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IUsuarioRegistro } from 'src/app/shared/interfaces/IUsuarioRegistro';
import { PasswordValidator } from 'src/app/shared/validador/password_validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  formularioRegistro!:FormGroup;
  isSubmitted = false;

  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(5)]],
      claveConfirmacion: ['', Validators.required],
      direccion: ['', [Validators.required, Validators.minLength(10)]]
    },{
      validators: PasswordValidator('clave','claveConfirmacion')
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
    const user :IUsuarioRegistro = {
      nombre: fv.nombre,
      email: fv.email,
      clave: fv.clave,
      claveConfirmacion: fv.claveConfirmacion,
      direccion: fv.direccion
    };

    this.usuarioService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}

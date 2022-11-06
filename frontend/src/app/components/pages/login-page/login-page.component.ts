import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  constructor(private formBuilder: FormBuilder,
     private usuarioService:UsuarioService,
     private activatedRoute:ActivatedRoute,
     private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }
  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    this.usuarioService.login({email:this.fc.email.value,
      clave: this.fc.password.value}).subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
  }

}

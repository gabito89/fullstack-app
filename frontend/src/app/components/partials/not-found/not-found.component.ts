import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  @Input()
  visible = false;
  @Input()
  mensajeNoEncontrado = "No encontrado!!!";
  @Input()
  textoResetLink = "Redirigir";
  @Input()
  rutaResetLink = "/";
  constructor() { }

  ngOnInit(): void {
  }

}

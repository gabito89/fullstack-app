import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarritoService } from 'src/app/services/carrito.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Pedido } from 'src/app/shared/models/Pedido';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  pedido:Pedido = new Pedido();
  checkoutForm!: FormGroup;
  constructor(carritoService:CarritoService,
              private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private toastrService: ToastrService,
              private pedidoService: PedidoService,
              private router: Router) {
                const cart = carritoService.getCarrito();
                this.pedido.items = cart.productos;
                this.pedido.precioTotal = cart.precioTotal;
              }

  ngOnInit(): void {
    let {nombre, direccion} = this.usuarioService.usuarioActual;
    this.checkoutForm = this.formBuilder.group({
      nombre:[nombre, Validators.required],
      direccion:[direccion, Validators.required]
    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  crearOrden(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Complete los campos', 'Campos Incompletos');
      return;
    }

    this.pedido.nombre = this.fc.nombre.value;
    this.pedido.direccion = this.fc.direccion.value;

    this.pedidoService.crearPedido(this.pedido).subscribe({
      next:() => {
        this.router.navigateByUrl('/confirmar');
      },
      error:(errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Carrito');
      }
    })
  }
}

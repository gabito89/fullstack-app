import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarritoService } from 'src/app/services/carrito.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/shared/models/Pedido';

@Component({
  selector: 'app-confirmacion-pago-page',
  templateUrl: './confirmacion-pago-page.component.html',
  styleUrls: ['./confirmacion-pago-page.component.css']
})
export class ConfirmacionPagoPageComponent implements OnInit {

  pedido:Pedido = new Pedido();
  constructor(private pedidoService: PedidoService,
    private carritoService: CarritoService,
    private router: Router,
    private toastrService: ToastrService) {
    pedidoService.getPedidoUsuarioActual().subscribe({
        next: (ped) => {
          this.pedido = ped;
        },
        error:(error) => {
          console.log(error);
          router.navigateByUrl('/checkout');
        }
      })

   }

  ngOnInit(): void {
  }

  confirmarOrden(){
    this.pedidoService.confirmar(this.pedido).subscribe({
      next: () => {
        this.carritoService.vaciarCarrito();
        this.router.navigateByUrl('/seguimiento');
        this.toastrService.success(
          'Pedido Confirmado Correctamente',
          'Ok'
        );
      },
      error: (error) => {
        this.toastrService.error('Confirmación de Pedido Erronea', 'Error');
      }
    })
  }
}

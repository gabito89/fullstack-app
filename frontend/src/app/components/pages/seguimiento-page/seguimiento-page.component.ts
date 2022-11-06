import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/shared/models/Pedido';

@Component({
  selector: 'app-seguimiento-page',
  templateUrl: './seguimiento-page.component.html',
  styleUrls: ['./seguimiento-page.component.css']
})
export class SeguimientoPageComponent implements OnInit {

  pedidos:Pedido[]=[];
  constructor(private pedidoService: PedidoService,
    private router: Router,) {
    pedidoService.getPedidoSeguimiento().subscribe({
        next: (ped) => {
          this.pedidos = ped;
        },
        error:(error) => {
          console.log(error);
          router.navigateByUrl('/');
        }
      });
   }

  ngOnInit(): void {
  }
}

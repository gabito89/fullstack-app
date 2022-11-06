import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from 'src/app/shared/models/Pedido';

@Component({
  selector: 'order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.css']
})
export class OrderItemsListComponent implements OnInit {

  @Input()
  pedido!:Pedido;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Order } from '../../models/order';
import { OrderService } from '../../providers/orders/orders';
import { NimbusBar } from '../../components/nimbus-bar/nimbus-bar';

@Component({
  templateUrl: 'build/pages/orders/orders.html',
  directives: [NimbusBar]
})
export class OrdersPage {
  orders: Order[];

  constructor(private navCtrl: NavController, private orderService: OrderService) {
    this.orders = this.orderService.getOrders();
  }

  toggleOrder(order) {
    order.show = !order.show;
  }

  isOrderShown(order) {
    return order.show;
  }

}

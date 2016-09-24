import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Order } from '../../models/order';
import { OrderService } from '../../providers/orders/orders';

@Component({
  templateUrl: 'build/pages/orders/orders.html'
})
export class OrdersPage {
  orders: Order[];

  constructor(private navCtrl: NavController, private orderService: OrderService) {
    this.orders = this.orderService.getOrders();
    for (var order of this.orders) {
      order.show = false;
    }
  }

  toggleOrder(order) {
    order.show = !order.show;
  }

  isOrderShown(order) {
    return order.show;
  }

}

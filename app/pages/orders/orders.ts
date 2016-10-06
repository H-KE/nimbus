import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Order } from '../../models/order';
import { OrderService } from '../../providers/orders/orders';
import { OrderDetailsPage } from '../order-details/order-details';


@Component({
  templateUrl: 'build/pages/orders/orders.html'
})
export class OrdersPage {
  orders: Order[];
  orderSegment: String;

  constructor(private navCtrl: NavController, private orderService: OrderService) {
    this.orderService.loadOrders()
      .map(response => response.json())
      .subscribe(
          data => {
            console.log(data);
            this.orders = data as Order[]
            this.orderSegment = "open";
            for (var order of this.orders) {
              order.show = false;
            }
          },
          error => console.log(error)
      )
  };

  goToOrderDetails(event, order) {
    this.navCtrl.push(OrderDetailsPage, {
      order: order
    });
  };

  isOrderShown(order) {
    return order.show;
  };
}

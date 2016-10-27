import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Order } from '../../models/order';
import { CartService } from '../../providers/cart/cart';
import { OrderService } from '../../providers/orders/orders';

@Component({
  selector: 'order-details',
  templateUrl: 'order-details.html'
})
export class OrderDetailsPage {
  order: Order;
  address: any;
  securityAnswer: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cartService: CartService,
              public orderService: OrderService) {
    this.order = null;
    this.order = navParams.get('order');
    this.address = JSON.parse(this.order.address);

    this.securityAnswer = this.order.dispensary_name.toLowerCase().replace(/ /g, '');
  };

  doRefresh(refresher) {
    this.orderService.loadOrder(this.order.id)
      .map(response => response.json())
      .subscribe(
          data => {
            console.log(data);
            this.order = data;
            refresher.complete();
          },
          error => refresher.complete()
      )
  };
}

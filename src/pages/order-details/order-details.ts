import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Order } from '../../models/order';
import { CartService } from '../../providers/cart/cart';


/*
  Generated class for the OrderDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'order-details',
  templateUrl: 'order-details.html'
})
export class OrderDetailsPage {
  order: Order;
  subTotal: number;
  orderTotal: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cartService: CartService) {
    this.order = null;
    this.order = navParams.get('order');
    this.subTotal = this.order.total_price;
    this.orderTotal = this.order.total_price;
  }

}

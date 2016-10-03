import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, LoadingController } from 'ionic-angular';

import { Order } from '../../models/order';
import { OrderDetailsPage } from '../order-details/order-details';

import { CartService } from '../../providers/cart/cart';
import { OrderService } from '../../providers/orders/orders';

@Component({
  templateUrl: 'build/pages/checkout/checkout.html'
})
export class CheckoutPage {
  order: Order;
  subTotal: number;
  orderTotal: number;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private orderService: OrderService,
              private cartService: CartService,
              private modalController: ModalController,
              private loadingCtrl: LoadingController) {

    this.order = null;
    this.order = navParams.get('order');
    this.subTotal = this.order.total;
    this.orderTotal = this.order.total + 5;
  }

  placeOrder() {

      this.orderService.placeOrder(this.order);

      this.cartService.clearCart();

      this.goToOrderDetails();
  }

  goToOrderDetails() {
    this.navCtrl.setRoot(OrderDetailsPage, {
      order: this.order
    });
  }


}

import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { OrderDetailsPage } from '../order-details/order-details';
import { OrderService } from '../../providers/orders/orders';
import { Order } from '../../models/order';
import { CartService } from '../../providers/cart/cart';


/*
  Generated class for the CheckoutPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/checkout/checkout.html',
})
export class CheckoutPage {
  order: Order;


  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private orderService: OrderService,
              private cartService: CartService,
              private alertController: AlertController) {
    this.order = null;
    this.order = navParams.get('order');
    console.log("checkout order:" + this.order);
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

import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Order } from '../../models/order'
import { OrdersPage } from '../orders/orders'
import { CartService } from '../../providers/cart/cart';
import { OrderService } from '../../providers/orders/orders';
import { CheckoutPage } from '../checkout/checkout'


@Component({
  templateUrl: 'build/pages/cart/cart.html'
})
export class CartPage {
  cart: any;
  order: Order;

  constructor(private navCtrl: NavController,
              private cartService: CartService,
              private orderService: OrderService,
              private alertController: AlertController) {
    this.cart = this.cartService.getCart();
    this.order = new Order();
  }

  goToOrders() {
    this.navCtrl.push(OrdersPage);
  }

  goToCheckout() {
    this.navCtrl.push(CheckoutPage, {
      order: this.order
    });
  }

  checkoutCart() {
    this.order.items = this.cart.content;
    this.order.address = "123 University Ave";
    this.order.user = "John Smith";
    this.order.total = this.cart.total;
    this.order.show = false;

    this.goToCheckout();

    this.order = new Order();
  }
  // placeOrder() {
  //   let confirm = this.alertController.create({
  //     title: "Place this order?",
  //     message: "By placing this order, you agree to the terms and services of Nimbus",
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Place Order',
  //         handler: () => {
  //           this.order.items = this.cart.content;
  //           this.order.address = "123 University Ave";
  //           this.order.user = "John Smith";
  //           this.order.total = this.cart.total;
  //           this.order.show = false;
  //           this.orderService.placeOrder(this.order);
  //
  //           this.cartService.clearCart();
  //           this.order = new Order();
  //         }
  //       }
  //     ]
  //   });
  //   confirm.present();
  // }

}

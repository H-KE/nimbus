import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Order } from '../../models/order'
import { CartService } from '../../providers/cart/cart';
import { OrderService } from '../../providers/orders/orders';

@Component({
  templateUrl: 'build/pages/cart/cart.html'
})
export class CartPage {
  title: string;
  cart: any;
  order: Order;

  constructor(private navCtrl: NavController, private cartService: CartService, private orderService: OrderService) {
    this.title = "Cart";
    this.cart = this.cartService.getCart();
    this.order = new Order();
  }

  placeOrder() {
    this.order.items = this.cart.content;
    this.order.address = "123 University Ave";
    this.order.user = "John Smith";
    this.order.total = this.cart.total;
    this.orderService.placeOrder(this.order);

    this.cartService.clearCart();
    this.order = new Order();
  }

}

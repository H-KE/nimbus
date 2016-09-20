import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CartService } from '../../providers/cart/cart';

@Component({
  templateUrl: 'build/pages/cart/cart.html'
})
export class CartPage {
  title: string;
  cart: any;

  constructor(private navCtrl: NavController, private cartService: CartService) {
    this.title = "Cart";
    this.cartService = cartService;
    this.cart = this.cartService.getCart();
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CartService } from '../../providers/cart/cart';

@Component({
  templateUrl: 'build/pages/cart/cart.html'
})
export class CartPage {
  cartContents: any;

  constructor(private navCtrl: NavController, private cartService: CartService) {
    this.cartService = cartService;
    this.cartContents = this.cartService.getCart();
  }

}

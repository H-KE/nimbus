import { Component, Input } from '@angular/core';
import { IONIC_DIRECTIVES}  from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';

import { CartPage } from '../../pages/cart/cart';
import { CartService } from '../../providers/cart/cart';

@Component({
  selector: 'nimbus-bar',
  templateUrl: 'build/components/nimbus-bar/nimbus-bar.html',
  directives: [IONIC_DIRECTIVES]
})
export class NimbusBar {

  @Input() showMenu: boolean;
  @Input() title: string;

  constructor(public navCtrl: NavController, navParams: NavParams, private cartService: CartService) {

  }

  openCart() {
    this.navCtrl.push(CartPage);
  }
}

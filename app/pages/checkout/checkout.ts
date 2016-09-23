import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OrderService } from '../../providers/orders/orders';

@Component({
  templateUrl: 'build/pages/checkout/checkout.html',
})
export class CheckoutPage {

  constructor(public navCtrl: NavController, navParams: NavParams, private orderService: OrderService) {

  }

}

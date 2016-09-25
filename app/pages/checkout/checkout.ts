import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderDetailsPage } from '../order-details/order-details'

/*
  Generated class for the CheckoutPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/checkout/checkout.html',
})
export class CheckoutPage {

  constructor(private navCtrl: NavController) {

  }

  goToOrderDetails() {
    this.navCtrl.setRoot(OrderDetailsPage);
  }

}

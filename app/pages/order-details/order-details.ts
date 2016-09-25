import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Order } from '../../models/order';

/*
  Generated class for the OrderDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/order-details/order-details.html',
})
export class OrderDetailsPage {
  order: Order;

  constructor(private navCtrl: NavController,
              private navParams: NavParams) {
    this.order = navParams.get('order');
  }

}

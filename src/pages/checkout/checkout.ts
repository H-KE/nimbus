import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, LoadingController } from 'ionic-angular';

import { Order } from '../../models/order';
import { OrderDetailsPage } from '../order-details/order-details';

import { CartService } from '../../providers/cart/cart';
import { OrderService } from '../../providers/orders/orders';
import { ProfileService } from '../../providers/profile/profile';


@Component({
  selector: 'checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {
  order: Order;
  user: any;
  subTotal: number;
  orderTotal: number;
  selectedAddress: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public orderService: OrderService,
              public cartService: CartService,
              public profileService: ProfileService,
              public modalController: ModalController,
              public loadingCtrl: LoadingController) {

    this.order = null;
    this.order = navParams.get('order');
    this.subTotal = this.order.total_price;
    this.orderTotal = this.order.total_price;

    this.profileService.getUser()
      .map(response => response.json())
      .subscribe(
        data => {
          console.log(data);
          this.user = data;
          this.selectedAddress = JSON.parse(data.address)[0];
          console.log(JSON.parse(data.address));
        },
        error => {
          console.log(error);
        }
      );
  }

  placeOrder() {
    this.order.address = JSON.stringify(this.selectedAddress);
    this.order.distribution_channel = "delivery";

    console.log(this.order);

    this.orderService.placeOrder(this.order)
      .map( res => res.json())
      .subscribe(
        data => {
          console.log(data);
          this.cartService.clearCart();
          this.goToOrderDetails();
        },
        errors => console.log(errors)
      )
  }

  goToOrderDetails() {
    this.navCtrl.setRoot(OrderDetailsPage, {
      order: this.order
    });
  }
}

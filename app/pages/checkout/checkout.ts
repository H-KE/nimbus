import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, LoadingController } from 'ionic-angular';

import { Order } from '../../models/order';
import { OrderDetailsPage } from '../order-details/order-details';

import { CartService } from '../../providers/cart/cart';
import { OrderService } from '../../providers/orders/orders';
import { ProfileService } from '../../providers/profile/profile';


@Component({
  templateUrl: 'build/pages/checkout/checkout.html',
  providers: [ ProfileService ]
})
export class CheckoutPage {
  order: Order;
  user: string;
  subTotal: number;
  orderTotal: number;
  userProfile: any;
  selectedAddress: any;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private orderService: OrderService,
              private cartService: CartService,
              private profileService: ProfileService,
              private modalController: ModalController,
              private loadingCtrl: LoadingController) {

    this.order = null;
    this.order = navParams.get('order');
    this.order.address = "123 University Ave";
    this.subTotal = this.order.total_price;
    this.orderTotal = this.order.total_price + 5;

    this.user = "John Smith";

    this.profileService.loadUserProfile()
      .map(response => response.json())
      .subscribe(
        data => {
          console.log(data);
          this.userProfile = data;
          this.selectedAddress = JSON.parse(data.address)[0];
          console.log(JSON.parse(data.address));

        },
        error => {
          console.log(error);
        }
      );
    }

  placeOrder() {

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

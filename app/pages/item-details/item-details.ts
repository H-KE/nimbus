import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

import { Item } from '../../models/item';
import { CartService } from '../../providers/cart/cart';
import {CartPage} from '../cart/cart';
import {NimbusBar} from '../../components/nimbus-bar/nimbus-bar';


@Component({
  templateUrl: 'build/pages/item-details/item-details.html',
  directives: [NimbusBar]
})
export class ItemDetailsPage {
  selectedItem: any;
  quantity: number;
  quantityLabel: string;
  itemPrice: number;
  displaySlider: boolean;
  slideOptions = {
    pager: true,
    loop: true
  };

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private toastCtrl: ToastController,
              private cartService: CartService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.quantity = 0;

    this.itemPrice = this.selectedItem.prices[this.quantity];
    this.quantityLabel = this.selectedItem.price_labels[this.quantity];

    this.displaySlider = this.selectedItem.prices.length > 1 ? true : false;
  }

  addToCart(selectedItem, quantity) {
    this.cartService.addToCart(selectedItem, selectedItem.price_labels[quantity], selectedItem.prices[quantity]);
    this.presentAddToCartToast(selectedItem);
    this.navCtrl.pop();
  }

  goToCart() {
    this.navCtrl.push(CartPage);
  }

  presentAddToCartToast(selectedItem) {
    let toast = this.toastCtrl.create({
      message: selectedItem.name + ' has been added to your cart.',
      duration: 3000
    });
    toast.present();
  }
}

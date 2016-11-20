import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

import { Item } from '../../models/item';
import { Dispensary } from '../../models/dispensary';
import { CartService } from '../../providers/cart/cart';
import { CartPage } from '../cart/cart';

import _ from 'underscore';

@Component({
  selector: 'item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: Item;
  itemSpec: string;
  retailer: Dispensary;
  quantity: number;
  quantityLabel: string;
  itemPrice: number;
  quantityRange: number[];
  dynamicSlider: boolean;
  disabled: boolean;
  slideOptions = {
    pager: true,
    loop: true
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public cartService: CartService) {
  }

  public ionViewDidLoad(): void {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = this.navParams.get('item');
    this.itemSpec = this.navParams.get('itemSpec');
    this.retailer = this.navParams.get('dispensary');
    this.selectedItem.retailer_name = this.retailer.name;

    this.itemPrice = this.selectedItem.prices[0];
    this.quantityLabel = this.selectedItem.price_labels[0];

    this.dynamicSlider = this.selectedItem.prices.length > 1 ? true : false;
    this.quantity = this.dynamicSlider ? 0 : 1;
    this.quantityRange = _.range(1,11);
    this.disabled = this.retailer.bio === "Coming soon" || this.selectedItem.price == null;
  };

  addToCart(selectedItem, quantity) {
    if (this.dynamicSlider == true) {
      this.cartService.addToCart(this.retailer.name, this.retailer, selectedItem, selectedItem.price_labels[quantity], selectedItem.prices[quantity]);
    } else {
      this.cartService.addToCart(this.retailer.name, this.retailer, selectedItem, quantity, quantity * this.itemPrice);
    }
    this.presentAddToCartToast(selectedItem);
    this.navCtrl.pop();
  }

  goToCart() {
    this.navCtrl.push(CartPage);
  }

  presentAddToCartToast(selectedItem) {
    let toast = this.toastCtrl.create({
      message: selectedItem.name + ' has been added to your cart.',
      duration: 3000,
      showCloseButton: true
    });
    toast.present();
  }
}

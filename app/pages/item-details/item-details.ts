import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

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

  constructor(public navCtrl: NavController, private navParams: NavParams, private cartService: CartService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.quantity = 0;

    this.itemPrice = this.selectedItem.prices[this.quantity];
    this.quantityLabel = this.selectedItem.price_labels[this.quantity];

    this.displaySlider = this.selectedItem.prices.length > 1 ? true : false;
  }

  addToCart(selectedItem, quantity) {
    this.cartService.addToCart(selectedItem, selectedItem.price_labels[quantity], selectedItem.prices[quantity]);
    this.navCtrl.pop();
  }

  goToCart() {
    this.navCtrl.push(CartPage);
  }
}

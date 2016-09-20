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

  constructor(public navCtrl: NavController, navParams: NavParams, private cartService: CartService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.quantity = 0;

    this.itemPrice = this.selectedItem.price[this.quantity];
    this.quantityLabel = this.selectedItem.priceLabels[this.quantity];

    this.displaySlider = this.selectedItem.price.length > 1 ? true : false;
  }

  addToCart(selectedItem, quantity) {
    this.cartService.addToCart(selectedItem, selectedItem.priceLabels[quantity], selectedItem.price[quantity]);
    this.navCtrl.pop();
  }
}

import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import { Item } from '../../models/item';

@Component({
  templateUrl: 'build/pages/item-details/item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  quantity: number;
  quantityLabel: string
  itemPrice: number;;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.quantity = 0;

    this.itemPrice = this.selectedItem.price[this.quantity];
    this.quantityLabel = this.selectedItem.priceLabels[this.quantity];

    console.log(this.selectedItem);
  }
}

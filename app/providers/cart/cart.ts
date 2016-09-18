import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Item } from '../../models/item';
import * as _ from 'underscore';

@Injectable()
export class CartService {
  cart: any[];

  constructor(private http: Http) {
    this.cart = [];
  }

  addToCart(item, quantity, price) {
    this.cart.push({
      item: item,
      quantity: quantity,
      price: price
    })
  }

  removeFromCart(removedItem, removedItemQuantity, removedItemPrice) {
    var cartItemIndex = _.findIndex(this.cart, function(item){
      return item.id == removedItem.id && item.quantity == removedItemQuantity && item.price == removedItemPrice;
    })

    if (cartItemIndex > -1) {
      this.cart.splice(cartItemIndex, 1);
    }

  }

}

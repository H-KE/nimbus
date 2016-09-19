import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Item } from '../../models/item';
import * as _ from 'underscore';

@Injectable()
export class CartService {
  cart: any[];
  cartTotal: number;

  constructor(private http: Http) {
    this.cart = [];
    this.cartTotal = 0;
  }

  getCart() {
    console.log(this.cart);
    return this.cart;
  }

  addToCart(item, quantity, price) {
    this.cart.push({
      item: item,
      quantity: quantity,
      price: price
    })

    this.cartTotal += price;
  }

  removeFromCart(removedItem) {
    var cartItemIndex = _.findIndex(this.cart, function(item){
      return item.id == removedItem.id && item.quantity == removedItem.quantity && item.price == removedItem.price;
    })

    if (cartItemIndex > -1) {
      this.cart.splice(cartItemIndex, 1);
      this.cartTotal -= removedItem.price;
    }

  }

}

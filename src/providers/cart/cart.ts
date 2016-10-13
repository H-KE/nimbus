import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Item } from '../../models/item';
import _ from 'underscore';

@Injectable()
export class CartService {
  cart: {
    content: Item[],
    count: number,
    total: number
  };

  constructor(public http: Http) {
    this.cart = {
      content: [],
      count: 0,
      total: 0
    };
  }

  getCart() {
    console.log(this.cart);
    return this.cart;
  }

  getCartTotal() {
    return this.cart.total;
  }

  getCartCount() {
    return this.cart.count;
  }

  addToCart(item, quantity, price) {
    let newItem = Object.assign({}, item);
    newItem.quantity = quantity;
    newItem.price = price;
    this.cart.content.push(newItem);
    this.cart.count = this.cart.content.length;
    this.cart.total += price;
  }

  removeFromCart(removedItem) {
    var cartItemIndex = _.findIndex(this.cart.content, function(item){
      return item.id == removedItem.id && item.quantity == removedItem.quantity && item.price == removedItem.price;
    })

    if (cartItemIndex > -1) {
      this.cart.content.splice(cartItemIndex, 1);
      this.cart.total -= removedItem.price;
    }

    this.cart.count = this.cart.content.length;
  }

  clearCart() {
    this.cart.content = [];
    this.cart.total = 0;
    this.cart.count = 0;
  }

  getItemThumbnail(item) {
    let url = item.images[0]
    if (item.retailer_id == 2) {
      url = url.replace('.jpg', '_tn.jpg');
    }
    return url;
  }

}

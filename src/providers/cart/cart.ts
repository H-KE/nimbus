import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Item } from '../../models/item';
import { Cart } from '../../models/cart';

import _ from 'underscore';

@Injectable()
export class CartService {
  carts: any; //TODO: object type should be map of dispensary name to cart objects, eg. {dispensary_name: Cart}
  itemCount: number;

  constructor(public http: Http) {
    this.carts = {};
    this.itemCount = 0;
  }

  getAll() {
    return this.carts;
  }
  getCart(dispensaryName) {
    return this.carts[dispensaryName];
  }

  getCartTotal(dispensaryName) {
    return this.carts[dispensaryName].total;
  }

  getCartCount() { //TODO: instead of keeping a state of the counts, might should make it stateless and sum up count when retreived
    return this.carts.itemCount;
  }

  addToCart(dispensaryName, item, quantity, price) {
    let newItem = Object.assign({}, item);
    newItem.quantity = quantity;
    newItem.price = price;

    let cart = this.carts[dispensaryName] == null?
                new Cart(dispensaryName, [], 0, 0) : this.carts[dispensaryName];
    cart.content.push(newItem);
    cart.count += 1;
    cart.total += price;

    this.carts[dispensaryName] = cart;
    this.itemCount += 1;

    console.log(this.carts);
  }

  removeFromCart(dispensaryName, removedItem, itemIndex) {
    this.carts[dispensaryName].content.splice(itemIndex, 1);
    this.carts[dispensaryName].total -= removedItem.price;

    this.carts[dispensaryName].count = this.carts[dispensaryName].content.length;

    this.itemCount -= 1;

    if(this.carts[dispensaryName].count == 0) {
      this.clearCart(dispensaryName);
    }
  }

  clearCart(dispensaryName) {//TODO: this is not used, but if to use, need to handle itemCOunt logic to it
    this.itemCount -= this.carts[dispensaryName].count;
    delete this.carts[dispensaryName];
    console.log(this.carts);
  }

  getItemThumbnail(item) { //TODO: Why is this here? move to item service or something
    let url = item.images[0]
    if (item.retailer_id == 2) {
      url = url.replace('.jpg', '_tn.jpg');
    }
    return url;
  }
}

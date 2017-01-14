import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage'
import 'rxjs/add/operator/map';

import { Item } from '../../models/item';
import { Cart } from '../../models/cart';

import _ from 'underscore';

@Injectable()
export class CartService {
  carts: any; //TODO: object type should be map of dispensary name to cart objects, eg. {dispensary_name: Cart}
  itemCount: number;

  constructor(public http: Http,
              public localStorage: Storage) {
    this.init()
  }

  init() {
    this.carts = JSON.parse(localStorage.getItem('carts')) || {};
    this.itemCount = +localStorage.getItem('itemCount') || 0;
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

  addToCart(dispensaryName, dispensary, item, quantity, price) {
    let newItem = Object.assign({}, item);
    newItem.quantity = quantity;
    newItem.price = price;

    let cart = this.carts[dispensaryName] == null?
                new Cart(dispensaryName, dispensary, [], 0, 0) : this.carts[dispensaryName];
    cart.content.push(newItem);
    cart.count += 1;
    cart.total += price;

    this.carts[dispensaryName] = cart;
    this.itemCount += 1;
    this.updateLocalStorage();
  }

  removeFromCart(dispensaryName, removedItem, itemIndex) {
    this.carts[dispensaryName].content.splice(itemIndex, 1);
    this.carts[dispensaryName].total -= removedItem.price;

    this.carts[dispensaryName].count = this.carts[dispensaryName].content.length;

    this.itemCount -= 1;

    if(this.carts[dispensaryName].count == 0) {
      this.clearCart(dispensaryName);
    }
    this.updateLocalStorage();
  }

  clearCart(dispensaryName) {
    this.itemCount -= this.carts[dispensaryName].count;
    delete this.carts[dispensaryName];
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('carts', JSON.stringify(this.carts));
    localStorage.setItem('itemCount', this.itemCount.toString());
  }

  getItemThumbnail(item) {
    let url = item.thumbnail == undefined? item.images[0] : item.thumbnail
    //TODO: make this better..
    if (item.retailer_id == 2) {
      url = url.replace('.jpg', '_tn.jpg');
    }
    return url;
  }
}

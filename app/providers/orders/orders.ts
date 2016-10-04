import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Item } from '../../models/item';
import { Order } from '../../models/order';
import * as _ from 'underscore';

@Injectable()
export class OrderService {
  orders: Order[];

  constructor(private http: Http) {
    this.orders = []
  }

  getOrders() {
    return this.orders;
  }

  placeOrder(order: Order) {
    order.dispensary_id = order.items[0].dispensary_id;
    this.orders.push(order);
    console.log(this.orders);
  }
}

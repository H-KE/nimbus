import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Item } from '../../models/item';
import { Order } from '../../models/order';
import { AuthenticationService } from '../../providers/authentication/authentication';

import * as _ from 'underscore';

@Injectable()
export class OrderService {
  orders: Order[];

  constructor(private http: Http,
              private auth: AuthenticationService) {
  }

  loadOrders() {
    return this.auth.get('orders');
  }

  placeOrder(order: Order) {
    order.retailer_id = order.order_details[0].retailer_id;
    order.status = "NEW";

    let body = JSON.stringify(order);
    return this.auth.post('orders', body);
  }
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "node_modules/rxjs/Observable";

import { Item } from '../../models/item';
import { Order } from '../../models/order';
import { AuthenticationService } from '../../providers/authentication/authentication';

import _ from 'underscore';

@Injectable()
export class OrderService {
  orders: Order[];

  constructor(public http: Http,
              public auth: AuthenticationService) {
  }

  loadOrders(): any {
    return this.auth.get('orders');
  }

  loadOrder(id): any {
    return this.auth.get('orders/'+id);
  }

  loadOrderAddress(id): any {
    return this.auth.get('addresses/'+id);
  }

  placeOrder(order: Order): any {
    order.retailer_id = order.order_details[0].retailer_id;
    order.status = "payment_pending";

    let body = JSON.stringify(order);
    return this.auth.post('orders', body);
  }

  getStatusDetailMessage(statusDetail: string): string {
    let statusDetailMapping = {
      'invalid_id': 'Your ID could not be verified. Please upload a clear photo of a government issued ID to verify your age is above 19 and place the order again.',
      'invalid_medical_doc': 'Your medical documents were not accepted. Please review and provide the accepted medical documents in the dispensary discription and place the order again.',
      'invalid_payment': 'Your e-transfer payment could not be deposited. Please try placing the order again following the payment instructions closely.',
      'out_of_stock': 'One or more items from your order are currently out of stock! We will notify you once it becomes available, and you can order again :)',
      'default': 'Your order was declined for unknown reasons. Please click on the contact us tab in the home menu and we will try to resolve the problem for you.'
    }
    return statusDetailMapping[statusDetail] || statusDetailMapping['default'];
  }
}

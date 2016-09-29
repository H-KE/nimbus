import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare var Stripe: any;

@Injectable()
export class PaymentService {

  constructor(private http: Http) {
    Stripe.setPublishableKey('pk_test_g1MDF7peQakv6tMjwUi1iFGD');
  }

  makePayment() {
    Stripe.card.createToken(
      {
          number: '4242424242424242',
          cvc: '123',
          exp_month: 12,
          exp_year: 2017
      }, this.stripeResponseHandler)
  }

  stripeResponseHandler(status, response) {
    console.log(status);
    console.log(response);
  }


}

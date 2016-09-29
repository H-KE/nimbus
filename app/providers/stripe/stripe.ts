import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare var Stripe: any;

@Injectable()
export class StripeService {

  constructor(private http: Http) {
    Stripe.setPublishableKey('pk_test_g1MDF7peQakv6tMjwUi1iFGD');
  }

  createToken(cardParams) {
    console.log(cardParams);
    Stripe.card.createToken(cardParams, this.stripeResponseHandler);
  }

  stripeResponseHandler(status, response) {
    console.log(status);
    console.log(response);
  }


}

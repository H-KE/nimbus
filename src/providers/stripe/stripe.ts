import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

declare var Stripe: any;

@Injectable()
export class StripeService {

  constructor(public http: Http) {
    Stripe.setPublishableKey('pk_test_g1MDF7peQakv6tMjwUi1iFGD');
  }

  createToken(cardParams) {
    return new Promise(resolve => {
      Stripe.card.createToken(cardParams, function(status, response) {
          resolve(response);
      });

    })
  }


}

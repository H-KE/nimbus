import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthenticationService } from '../authentication/authentication'
import 'rxjs/add/operator/map';

import { Item } from '../../models/item';
import * as _ from 'underscore';

@Injectable()
export class ProfileService {

  constructor(private http: Http,
              private auth: AuthenticationService) {
  }

  loadUserCards() {
    return this.auth.get('users/credit_cards')
  }

  addCreditCardToUser(token) {
    let body = JSON.stringify({
      token: token
    });

    return new Promise(resolve => {
      this.auth.put('users/add_credit_card', body)
        .map(response => response.json())
        .subscribe(
          data => {
            console.log(data);
            resolve(data);
          },
          error => {
            console.log(error);
            resolve(error);
          }
        )
      });
  }
}

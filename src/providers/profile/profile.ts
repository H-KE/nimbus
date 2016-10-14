import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthenticationService } from '../authentication/authentication'
import { Observable } from "node_modules/rxjs/Observable";

import { Item } from '../../models/item';
import _ from 'underscore';

@Injectable()
export class ProfileService {

  constructor(public http: Http,
              public auth: AuthenticationService) {
  }

  getUser() {
    return this.auth.get('users/credit_cards')
  }

  updateUser(data) {
    let body = JSON.stringify(data);

    return new Promise(resolve => {
      this.auth.put('users/update_user', body)
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

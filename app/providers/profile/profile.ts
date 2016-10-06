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

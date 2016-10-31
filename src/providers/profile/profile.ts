import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthenticationService } from '../authentication/authentication'
import { Observable } from "node_modules/rxjs/Observable";
import { Storage } from '@ionic/storage'

import { Item } from '../../models/item';
import _ from 'underscore';

@Injectable()
export class ProfileService {

  constructor(public http: Http,
              public auth: AuthenticationService,
              public localStorage: Storage) {
  }

  getUser(): any {
    return this.auth.get('users/current_user')
  }

  updateUser(data) {
    let body = JSON.stringify(data);

    return new Promise(resolve => {
      this.auth.put('users/current_user', body)
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

  addAddress(data): any {
    let body = JSON.stringify(data);

    return this.auth.post('addresses', body);
  }
}

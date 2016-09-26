import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';

import { User } from '../../models/user'
import { AuthenticationService } from '../../providers/authentication/authentication'

@Component({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(private navCtrl: NavController, private auth: AuthenticationService) {

  }

  signup() {
    let user = new User;
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.email = this.email;
    user.password = this.password;

    this.auth.register(user).then(data => {
      if(data){
        this.gotoSearch();
      }
    });
  }

  gotoSearch() {
    this.navCtrl.setRoot(SearchPage);
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';

import { User } from '../../models/user'
import { AuthenticationService } from '../../providers/authentication/authentication'

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

  email: string;
  password: string;
  errorMessage: string;

  constructor(private navCtrl: NavController, private auth: AuthenticationService) {
    this.errorMessage = " ";
  }

  login() {
    let user = new User;
    user.email = this.email;
    user.password = this.password;

    this.auth.login(user).then(response => {
      if(response == true){
        this.gotoSearch();
      } else {
        this.errorMessage = "Invalid credentials"
      }
    });
  }

  gotoSearch() {
    this.navCtrl.setRoot(SearchPage);
  }
}

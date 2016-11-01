import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { SearchPage } from '../search/search';

import { User } from '../../models/user'
import { AuthenticationService } from '../../providers/authentication/authentication'

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: string;
  password: string;
  errorMessage: string;

  constructor(public navCtrl: NavController,
              public auth: AuthenticationService,
              public loadingCtrl: LoadingController) {
    this.errorMessage = " ";
  }

  login() {
    let user = new User;
    user.email = this.email;
    user.password = this.password;
    var loader = this.loadingCtrl.create({});
    loader.present();
    this.auth.signIn(this.email, this.password)
      .map(response => response.json())
      .subscribe(
        res => {
          loader.dismiss();
          this.gotoSearch();
        },
        error => {
          loader.dismiss();
          this.errorMessage = "Invalid login credentials.";
        }
      )
  }

  gotoSearch() {
    this.navCtrl.setRoot(SearchPage);
  }
}

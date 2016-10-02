import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { AuthenticationService } from '../../providers/authentication/authentication'

@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

  constructor(private navCtrl: NavController,
              private auth: AuthenticationService) {

  }

  goToSearch() {

    this.auth.signIn(
      "admin@nimbusfly.co",
      "topsecret")
      .map(response => response.json())
      .subscribe(
        res => this.navCtrl.setRoot(SearchPage),
        error => console.log("WTF")
      )
  }

  goToSignUp() {
    this.navCtrl.push(SignupPage);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }
}

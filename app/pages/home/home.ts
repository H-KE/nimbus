import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';

@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

  constructor(private navCtrl: NavController) {

  }

  goToSearch() {
    this.navCtrl.push(SearchPage);
  }

  goToSignUp() {
    this.navCtrl.push(SignupPage);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

  constructor(private navCtrl: NavController) {

  }

  gotoSignUp() {
    this.navCtrl.push(SignupPage);
  }

  gotoLogin() {
    this.navCtrl.push(LoginPage);
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { AuthenticationService } from '../../providers/authentication/authentication'

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public auth: AuthenticationService) {

  }

  ionViewDidLoad() {
    this.auth.validateToken()
      .map(res => res.json())
      .subscribe(
        res => {
          this.goToSearch();
        },
        error => {}
      )
  }

  goToSearch() {
    this.navCtrl.setRoot(SearchPage);
  }

  goToSignUp() {
    this.navCtrl.push(SignupPage);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }
}

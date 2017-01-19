import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
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
              public auth: AuthenticationService,
              public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    this.menuCtrl.swipeEnable(false);
  }

  ionViewDidEnter() {
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

  oauth(type) {
    this.auth.signInOAuth(type);
  }
}

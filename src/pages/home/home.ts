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
  slideOptions = {
    initialSlide: 0,
    pager: true
  };

  slides = [
    {
      title: "Welcome",
      description: "Nimbus is the simplest way to buy marijuana in Canada.",
      image: "assets/img/nimbus-logo.png",
    },
    {
      title: "Mail Delivery",
      description: "Don't want to go outside? Stay home and get premium cannabis <b>delivered straight to your door</b> from Canada's highest-quality dispensaries.",
      image: "assets/img/nimbus-logo.png",
    },
    {
      title: "Premier Service",
      description: "We are partnered with the best online vendors in Canada, so you can order from <b>a huge selection of products</b> all from one app.",
      image: "assets/img/nimbus-logo.png",
    }
  ];

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

  goToSignUp() {
    this.navCtrl.push(SignupPage);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  oauth(type) {
    this.auth.signInOAuth(type);
  }
}

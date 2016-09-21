import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {SearchPage} from './pages/search/search';
import {CartPage} from './pages/cart/cart';
import {LoginPage} from './pages/login/login';
import * as _ from 'underscore';

import {CartService} from './providers/cart/cart';


@Component({
  templateUrl: 'build/app.html',
  providers: [CartService]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make SearchPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: SearchPage },
      { title: 'My Cart', component: CartPage },
      { title: 'Login', component: LoginPage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);

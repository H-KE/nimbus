import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {HomePage} from './pages/home/home';
import {SearchPage} from './pages/search/search';
import {OrdersPage} from './pages/orders/orders'
import {LoginPage} from './pages/login/login';
import {ProfilePage} from './pages/profile/profile';


import {CartService} from './providers/cart/cart';
import {OrderService} from './providers/orders/orders';
import {AuthenticationService} from './providers/authentication/authentication'
import {StripeService} from './providers/stripe/stripe';
import * as _ from 'underscore';

@Component({
  templateUrl: 'build/app.html',
  providers: [CartService, OrderService, AuthenticationService, StripeService]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make SearchPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, icon: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Explore', icon: 'search', component: SearchPage },
      { title: 'My Orders', icon: 'cloud', component: OrdersPage},
      { title: 'My Profile', icon: 'contact', component: ProfilePage}
      // { title: 'Logout', component: HomePage} //TODO: remove this from menu or do actual logout
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

ionicBootstrap(MyApp,[CartService, StripeService, AuthenticationService, OrderService]);

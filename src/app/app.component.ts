import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from '../pages/home/home';

import { AuthenticationService } from '../providers/authentication/authentication'
import { SideMenuService } from '../providers/side-menu/side-menu'

import mixpanel from 'mixpanel-browser'

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(public platform: Platform,
              public auth: AuthenticationService,
              public sideMenu: SideMenuService) {
    this.initializeApp();
    sideMenu.loadSideMenu();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      mixpanel.init("763361f8295db208ff1ba60a68b321b5")
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

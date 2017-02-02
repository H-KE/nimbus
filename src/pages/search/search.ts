import {Component, NgZone} from '@angular/core';
import { Storage } from '@ionic/storage'
import { NavController, NavParams, Platform, LoadingController, MenuController, AlertController } from 'ionic-angular';

import {Dispensary} from '../../models/dispensary'

import {DispensaryTabsPage} from '../dispensary-tabs/dispensary-tabs'
import {CartPage} from '../cart/cart';

import {CartService} from '../../providers/cart/cart';
import {DispensaryService} from '../../providers/dispensary/dispensary';
import { SideMenuService } from '../../providers/side-menu/side-menu'
import { AuthenticationService } from '../../providers/authentication/authentication'

import _ from 'lodash'
import mixpanel from 'mixpanel-browser'

@Component({
  selector: 'search',
  templateUrl: 'search.html'
})

export class SearchPage {
  dispensaries: any;

  constructor(public dispensaryService: DispensaryService,
              public navCtrl: NavController,
              public cartService: CartService,
              public loadingCtrl: LoadingController,
              public menuCtrl: MenuController,
              public localStorage: Storage,
              public alertCtrl: AlertController,
              public sideMenu: SideMenuService,
              public auth: AuthenticationService) {
    this.menuCtrl.swipeEnable(true);
    this.loadDispensaries();

    this.sideMenu.loadSideMenu();
  }

  public ionViewDidLoad(): void {
    if(!this.isLocalStorageSupported()) {
      let alert = this.alertCtrl.create({
        title: 'Private Mode Detected',
        message: 'Some functionalities will not work under Safari private mode. To turn off: Tap □ in bottom right corner, tap Private, then tap Done',
        buttons: [{
          text: 'Ok'
        }]
      });
      alert.present();
    }
  }

  loadDispensaries() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.dispensaryService.getAll()
      .then(response => {
        this.dispensaries = response
        this.dispensaries = _.chunk(response, 3)
        loader.dismiss();
      });
  }

  dispensarySelected(event, dispensary) {
    mixpanel.track("Dispensary selected", {
      api: this.auth._options.apiPath,
      user: this.auth._currentAuthData ? this.auth._currentAuthData.uid : 'unregistered',
      dispensary: dispensary.name
    });
    this.navCtrl.push(DispensaryTabsPage, {
      dispensary: dispensary,
      dispensaryId: dispensary.id
    });
  }

  goToCart() {
    this.navCtrl.push(CartPage);
  }

  isLocalStorageSupported() {
    try {
      localStorage.setItem('test', '1')
      localStorage.removeItem('test')
      return true
    } catch (error) {
      return false
    }
  }
}

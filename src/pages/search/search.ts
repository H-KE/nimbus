import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, Platform, LoadingController, MenuController} from 'ionic-angular';

import {Dispensary} from '../../models/dispensary'

import {DispensaryTabsPage} from '../dispensary-tabs/dispensary-tabs'
import {CartPage} from '../cart/cart';

import {CartService} from '../../providers/cart/cart';
import {DispensaryService} from '../../providers/dispensary/dispensary';
import { SideMenuService } from '../../providers/side-menu/side-menu'

import _ from 'lodash'

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
              public sideMenu: SideMenuService) {
  }

  public ionViewDidLoad(): void {
    this.menuCtrl.swipeEnable(true);
    this.loadDispensaries();

    this.sideMenu.loadSideMenu();
  }

  loadDispensaries() {
    var loader = this.loadingCtrl.create();
    loader.present();
    this.dispensaryService.getAll()
      .then(response => {
        this.dispensaries = this.orderDispensariesByReadiness(response);
        this.dispensaries = _.chunk(response, 3)
        loader.dismiss();
      });
  }

  orderDispensariesByReadiness(dispensaries) {
    let comingSoons = _.filter(dispensaries, function(dispensary) {
      return dispensary.bio == 'Coming soon';
    });
    let goodToGos =  _.filter(dispensaries, function(dispensary) {
      return dispensary.bio != 'Coming soon' && dispensary.bio != 'Hidden';
    });
    return goodToGos.concat(comingSoons);
  }

  dispensarySelected(event, dispensary) {
    this.navCtrl.push(DispensaryTabsPage, {
      dispensary: dispensary,
      dispensaryId: dispensary.id
    });
  }

  goToCart() {
    this.navCtrl.push(CartPage);
  }
}

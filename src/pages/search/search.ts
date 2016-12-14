import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, Platform, LoadingController, MenuController} from 'ionic-angular';

import {Dispensary} from '../../models/dispensary'

import {DispensaryPage} from '../dispensary/dispensary'
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
  pickupDispensaries: any;
  mailDispensaries: any;
  searchMode: string;

  constructor(public dispensaryService: DispensaryService,
              public navCtrl: NavController,
              public platform: Platform,
              public _zone: NgZone,
              public cartService: CartService,
              public loadingCtrl: LoadingController,
              public menuCtrl: MenuController,
              public sideMenu: SideMenuService) {
  }

  public ionViewDidLoad(): void {
    this.menuCtrl.swipeEnable(true);
    this.searchMode = "mail";
    this.loadDispensaries();

    this.sideMenu.loadSideMenu();
  }

  loadDispensaries() {
    var loader = this.loadingCtrl.create({
      content: "Finding Dispensaries...",
    });
    loader.present();
    this.dispensaryService.getAll()
      .then(response => {
        let dispensaries = this.orderDispensariesByReadiness(response);
        this.mailDispensaries = _.filter(dispensaries, function(dispensary) {
          return dispensary.mail == true;
        });
        this.mailDispensaries = _.chunk(this.mailDispensaries, 3)

        this.pickupDispensaries = _.filter(dispensaries, function(dispensary) {
          return dispensary.pickup == true;
        });
        this.pickupDispensaries = _.chunk(this.pickupDispensaries, 3)
        loader.dismiss();
      });
  }

  clearDispensaries() {
    this.mailDispensaries = null;
    this.pickupDispensaries = null;
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
    this.navCtrl.push(DispensaryPage, {
      dispensary: dispensary,
      dispensaryId: dispensary.id
    });
  }

  goToCart() {
    this.navCtrl.push(CartPage);
  }

  firstToUpperCase( str: String ) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  }
}

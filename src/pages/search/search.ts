import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, Platform, LoadingController, MenuController} from 'ionic-angular';

import {Dispensary} from '../../models/dispensary'

import {DispensaryPage} from '../dispensary/dispensary'
import {CartPage} from '../cart/cart';

import {CartService} from '../../providers/cart/cart';
import {DispensaryService} from '../../providers/dispensary/dispensary';

import _ from 'underscore';

@Component({
  selector: 'search',
  templateUrl: 'search.html'
})

export class SearchPage {
  pickupDispensaries: Dispensary;
  mailDispensaries: Dispensary;
  searchMode: string;

  constructor(public dispensaryService: DispensaryService,
              public navCtrl: NavController,
              public platform: Platform,
              public _zone: NgZone,
              public cartService: CartService,
              public loadingCtrl: LoadingController,
              public menuCtrl: MenuController) {
  }

  public ionViewDidLoad(): void {
    this.menuCtrl.swipeEnable(true);
    this.searchMode = "mail";
    this.loadDispensaries();
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
        this.pickupDispensaries = _.filter(dispensaries, function(dispensary) {
          return dispensary.pickup == true;
        });
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
      return dispensary.bio != 'Coming soon';
    });
    return goodToGos.concat(comingSoons);
  }

  dispensarySelected(event, dispensary) {
    this.navCtrl.push(DispensaryPage, {
      dispensary: dispensary
    });
  }

  goToCart() {
    this.navCtrl.push(CartPage);
  }

  firstToUpperCase( str: String ) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  }
}

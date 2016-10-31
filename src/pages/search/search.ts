import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, Platform, LoadingController} from 'ionic-angular';

import {Dispensary} from '../../models/dispensary'

import {DispensaryPage} from '../dispensary/dispensary'
import {CartPage} from '../cart/cart';

import {CartService} from '../../providers/cart/cart';
import {DispensaryService} from '../../providers/dispensary/dispensary';

@Component({
  selector: 'search',
  templateUrl: 'search.html'
})

export class SearchPage {
  dispensaries: Dispensary;
  searchMode: string;

  constructor(public dispensaryService: DispensaryService,
              public navCtrl: NavController,
              public platform: Platform,
              public _zone: NgZone,
              public cartService: CartService,
              public loadingCtrl: LoadingController) {
    this.searchMode = "mail";
    this.platform.ready().then(() => this.onPlatformReady());
  }

  public onPlatformReady(): void {
    this.loadDispensaries(this.searchMode);
  }

  loadDispensaries(searchMode) {
    var loader = this.loadingCtrl.create({
      content: "Finding Dispensaries...",
    });
    loader.present();
    this.dispensaryService.getDispensaries(searchMode)
      .then(response => {
        this.dispensaries = response as Dispensary;
        loader.dismiss();
      });
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

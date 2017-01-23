import { Component } from '@angular/core'
import { NavParams, NavController } from 'ionic-angular'

import { DispensaryMenuPage } from '../dispensary-menu/dispensary-menu'
import { DispensaryInfoPage } from '../dispensary-info/dispensary-info'
import { DispensaryReviewPage } from '../dispensary-review/dispensary-review'
import { CartPage } from '../cart/cart'

import { CartService } from '../../providers/cart/cart'

@Component({
  selector: 'dispensary-tabs',
  templateUrl: 'dispensary-tabs.html'
})
export class DispensaryTabsPage {
  menuRoot = DispensaryMenuPage;
  reviewRoot = DispensaryReviewPage;
  infoRoot = DispensaryInfoPage;
  dispensary: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cartService: CartService) {
    this.dispensary = this.navParams.get('dispensary')
    console.log(this.dispensary)
  }

  public ionViewDidLoad(): void {

  }

  goToCart() {
    this.navCtrl.push(CartPage)
  }
}

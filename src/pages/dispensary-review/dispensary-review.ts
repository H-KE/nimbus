import { Component } from '@angular/core'
import { NavParams, NavController } from 'ionic-angular'

import { CartPage } from '../cart/cart'
import { CartService } from '../../providers/cart/cart'

@Component({
  selector: 'dispensary-review',
  templateUrl: 'dispensary-review.html'
})
export class DispensaryReviewPage {
  selectedDispensary: any

  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              public cartService: CartService) {

  }

  public ionViewDidLoad(): void {
    this.selectedDispensary = this.navParams.data
  }

  goToCart() {
    this.navCtrl.push(CartPage)
  }
}

import { Component, Inject } from '@angular/core'
import { NavController, NavParams, LoadingController, ToastController} from 'ionic-angular'

import { Item } from '../../models/item'
import { Dispensary } from '../../models/dispensary'
import { ItemDetailsPage } from '../item-details/item-details'
import { CartPage } from '../cart/cart'
import { CartService } from '../../providers/cart/cart'
import { DispensaryService } from '../../providers/dispensary/dispensary'

import _ from 'lodash'

@Component({
  selector: 'dispensary',
  templateUrl: 'dispensary.html'
})
export class DispensaryPage {
  selectedDispensary: any
  menu: Item[]
  menuCategories: any[]
  PERCENT_SPEC_CATEGORIES = ["Indica",
                                     "Sativa",
                                     "Hybrid",
                                     "Flowers",
                                     "Pre-rolls",
                                     "Prerolls",
                                     "Concentrates",
                                     "Cartridges",
                                     "Cannabis Oil (Tears)"]
  MG_SPEC_CATEGORIES = ["Edibles",
                        "Capsules",
                        "Extracts"]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cartService: CartService,
              public dispensaryService: DispensaryService,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {

  }

  public ionViewDidLoad(): void {
    if(!this.navParams.get('dispensary')) {
      var loader = this.loadingCtrl.create({})
      loader.present()
      this.dispensaryService.getDispensary(this.navParams.get('dispensaryId'))
        .then(dispensary => {
          this.selectedDispensary = dispensary
          this.categorizeMenu()
          loader.dismiss()
        })
    } else {
      this.selectedDispensary = this.navParams.get('dispensary')
      this.categorizeMenu()
    }
  }

  categorizeMenu() {
    this.menu = _.sortBy(this.selectedDispensary.products, 'id')
    this.menuCategories = []
    for (var category of _.uniq(_.map(this.menu, 'category'))) {
      this.menuCategories.push ({
        name: category,
        items: _.filter(this.menu, item => item.category == category)
      })
    }
  }

  itemSelected(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item,
      itemSpec: this.renderItemDescription(item),
      dispensary: this.selectedDispensary
    })
  }

  goToCart() {
    this.navCtrl.push(CartPage)
  }

  isFlower(item) {
    return item.prices.length > 1 ? true : false
  }

  renderItemPrice(item: Item) {
    if(this.isFlower(item)) {
      return "$" + item.prices[1]
    } else {
      return "$" + item.prices[0]
    }
  }

  renderItemDescription(item: Item) {
    var desc = ""

    if(_.includes(this.PERCENT_SPEC_CATEGORIES, item.category)) {
      if (item.thc == 0 && item.cbd == 0 ) {
        desc += "THC: --% | CBD: --%"
      } else {
        desc += "THC: " + item.thc + "% | CBD: " + item.cbd + "%"
      }
    } else if(_.includes(this.MG_SPEC_CATEGORIES, item.category)) {
      if (item.thc == 0 && item.cbd == 0 ) {
        desc += "THC: --mg | CBD: --mg"
      } else {
        desc += "THC: " + item.thc + "mg | CBD: " + item.cbd + "mg"
      }
    }

    return desc
  }

  isItemDisabled(item) {
    return this.selectedDispensary.bio === "Coming soon" || item.prices == null || item.prices[0] == null
  }

  addToCart($event, selectedItem) {
    $event.stopPropagation()
    if(this.isFlower(selectedItem)) {
      this.cartService.addToCart(this.selectedDispensary.name, this.selectedDispensary, selectedItem, selectedItem.price_labels[1], 1 * selectedItem.prices[1])
    } else {
      this.cartService.addToCart(this.selectedDispensary.name, this.selectedDispensary, selectedItem, selectedItem.price_labels[0], 1 * selectedItem.prices[0])
    }
    this.presentAddToCartToast(selectedItem)
  }

  presentAddToCartToast(selectedItem) {
    let message = ''
    if(this.isFlower(selectedItem)) {
      message = 'One ' + selectedItem.price_labels[1] + ' of ' + selectedItem.name + ' has been added to your cart.'
    } else {
      message = 'One ' + selectedItem.name + ' has been added to your cart.'
    }
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true
    })
    toast.present()
  }
}

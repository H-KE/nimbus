import { Component, Inject } from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';

import { Item } from '../../models/item';
import { Dispensary } from '../../models/dispensary';
import { ItemDetailsPage } from '../item-details/item-details';
import { CartPage } from '../cart/cart';
import { CartService } from '../../providers/cart/cart';

import _ from 'underscore';

@Component({
  selector: 'dispensary',
  templateUrl: 'dispensary.html'
})
export class DispensaryPage {
  selectedDispensary: Dispensary;
  menu: Item[];
  menuCategories: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cartService: CartService,
              public loadingCtrl: LoadingController) {
    this.selectedDispensary = navParams.get('dispensary');
    this.menu = _.sortBy(this.selectedDispensary.products, 'id');
    this.categorizeMenu();
  }

  categorizeMenu() {
    this.menuCategories = [];
    for (var category of _.uniq(_.pluck(this.menu, 'category'))) {
      this.menuCategories.push ({
        name: category,
        show: false,
        items: _.where(this.menu, {category: category}) as Item[]
      })
    }
  }

  toggleMenuCategory(category) {
    category.show = !category.show;
  }

  isCategoryShown(category) {
    return category.show;
  }

  itemSelected(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item,
      dispensary: this.selectedDispensary
    });
  }

  goToCart() {
    this.navCtrl.push(CartPage);
  }

  renderItemDescription(item: Item) {
    switch(item.category) {
      case "Flowers":
        var desc = "";
        if (item.thc == 0 && item.cbd == 0 ) {
          desc += "THC: --% CBD: --%| ";
        } else {
          desc += "THC: " + item.thc + "% CBD: " + item.cbd + "% | ";
        }
        desc += "$" + item.prices[0] + " / " + item.price_labels[0];
        return desc

      case "Hybrid":
        var desc = "";
        if (item.thc == 0 && item.cbd == 0 ) {
          desc += "THC: --% CBD: --%| ";
        } else {
          desc += "THC: " + item.thc + "% CBD: " + item.cbd + "% | ";
        }
        desc += "$" + item.prices[0] + " / " + item.price_labels[0];
        return desc

      case "Indica":
        var desc = "";
        if (item.thc == 0 && item.cbd == 0 ) {
          desc += "THC: --% CBD: --%| ";
        } else {
          desc += "THC: " + item.thc + "% CBD: " + item.cbd + "% | ";
        }
        desc += "$" + item.prices[0] + " / " + item.price_labels[0];
        return desc

      case "Sativa":
        var desc = "";
        if (item.thc == 0 && item.cbd == 0 ) {
          desc += "THC: --% CBD: --%| ";
        } else {
          desc += "THC: " + item.thc + "% CBD: " + item.cbd + "% | ";
        }
        desc += "$" + item.prices[0] + " / " + item.price_labels[0];
        return desc

      case "Cartridges":
        return "THC: " + item.thc + "% CBD: " + item.cbd + "% | " + "$" + item.prices[0];
      case "Vaporizers":
        return "$" + item.prices[0];
      case "Concentrates":
        return "THC: " + item.thc + "% CBD: " + item.cbd + "% | " + "$" + item.prices[0];
      case "Edibles":
        return "THC: " + item.thc + "mg CBD: " + item.cbd + "mg | " + "$" + item.prices[0];
      case "Cannabis Oil (Tears)":
        return "THC: " + item.thc + "% CBD: " + item.cbd + "% | " + "$" + item.prices[0];
      case "Pre-rolls":
        var desc = ""
        if (item.thc == 0 && item.cbd == 0 ) {
          desc += "THC: --% CBD: --%| ";
        } else {
          desc += "THC: " + item.thc + "% CBD: " + item.cbd + "% | ";
        }
        desc += "$" + item.prices[0];
        return desc
      case "Capsules":
        return "THC: " + item.thc + "mg CBD: " + item.cbd + "mg | " + "$" + item.prices[0];
      default:
        return "$" + item.prices[0];
    }
  }
}

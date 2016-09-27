import { Component, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuService } from '../../providers/menu/menu';
import { Constants } from '../../../resources/constants/constants';
import { Item } from '../../models/item';
import { ItemDetailsPage } from '../item-details/item-details';
import {CartPage} from '../cart/cart';
import {NimbusBar} from '../../components/nimbus-bar/nimbus-bar';
import * as _ from 'underscore';

@Component({
  templateUrl: 'build/pages/dispensary/dispensary.html',
  providers: [MenuService, Constants],
  directives: [NimbusBar]
})
export class DispensaryPage {
  selectedDispensary: any;
  menu: Item[];
  menuCategories: any[];

  constructor(public navCtrl: NavController, navParams: NavParams, menuService: MenuService, constants: Constants) {
    this.selectedDispensary = navParams.get('dispensary');

    this.menu = menuService.getMenuForDispensary();
    this.menuCategories = [];
    for (var category of constants.menuCategories) {
      this.menuCategories.push ({
        name: category,
        show: false,
        items: _.where(this.menu, {category: category})
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
      item: item
    });
  }
}

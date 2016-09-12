import { Component, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuService } from '../../providers/menu/menu';
import { Constants } from '../../../resources/constants/constants';
import { Item } from '../../models/item';
import { ItemDetailsPage } from '../item-details/item-details';


@Component({
  templateUrl: 'build/pages/dispensary/dispensary.html',
  providers: [MenuService]
})
export class DispensaryPage {
  selectedDispensary: any;
  menu: Item[];
  menu_subcategories: any;

  constructor(public navCtrl: NavController, navParams: NavParams, menuService: MenuService, @Inject(Constants) constants: Constants) {
    this.selectedDispensary = navParams.get('dispensary');

    this.menu = menuService.getMenuForDispensary();
    this.menu_subcategories = constants.menu_subcategories;
  }

  itemSelected(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}

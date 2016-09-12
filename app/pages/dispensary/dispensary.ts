import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuService } from '../../providers/menu/menu';
import { Item } from '../../models/item';


@Component({
  templateUrl: 'build/pages/dispensary/dispensary.html',
  providers: [MenuService]
})
export class DispensaryPage {
  selectedDispensary: any;
  menu: Item[];

  constructor(public navCtrl: NavController, navParams: NavParams, menuService: MenuService) {
    this.selectedDispensary = navParams.get('dispensary');

    this.menu = menuService.getMenuForDispensary();
  }

}

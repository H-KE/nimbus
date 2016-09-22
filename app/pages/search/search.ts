import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Dispensary} from '../../models/dispensary'
import {DispensaryService} from '../../providers/dispensary/dispensary';
import {DispensaryPage} from '../dispensary/dispensary'
import {CartPage} from '../cart/cart';
import {NimbusBar} from '../../components/nimbus-bar/nimbus-bar';

@Component({
  templateUrl: 'build/pages/search/search.html',
  providers: [DispensaryService],
  directives: [NimbusBar]
})

export class SearchPage {
  placeholder: string;
  dispensaries: Dispensary[];
  searchMode: string;

  constructor(dispensaryService: DispensaryService, public navCtrl: NavController) {
    this.placeholder = "Search for a dispensary";
    this.dispensaries = dispensaryService.getNearestDispensaries();
    this.searchMode = "mail";
  }

  dispensarySelected(event, dispensary) {
    this.navCtrl.push(DispensaryPage, {
      dispensary: dispensary
    });
  }
}

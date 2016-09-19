import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Dispensary} from '../../models/dispensary'
import {DispensaryService} from '../../providers/dispensary/dispensary';
import {DispensaryPage} from '../dispensary/dispensary'


@Component({
  templateUrl: 'build/pages/nimbus-home/nimbus-home.html',
  providers: [DispensaryService]
})
export class NimbusHomePage {
  placeholder: string;
  dispensaries: Dispensary[];
  constructor(dispensaryService: DispensaryService, public navCtrl: NavController) {

      this.placeholder = "Search for a dispensary";
      this.dispensaries = dispensaryService.getNearestDispensaries();
  }

  dispensarySelected(event, dispensary) {
    this.navCtrl.push(DispensaryPage, {
      dispensary: dispensary
    });
  }
}

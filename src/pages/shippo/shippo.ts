import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'shippo',
  templateUrl: 'shippo.html'
})
export class ShippoPage {
  shippoLink: string;

  constructor(public navCtrl: NavController) {};
}

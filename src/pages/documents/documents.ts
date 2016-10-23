import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'documents',
  templateUrl: 'documents.html'
})
export class DocumentsPage {
  documents: any[];
  slideOptions = {
    pager: true,
    loop: true
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,) {
    this.documents = navParams.get('documents');
  }

}

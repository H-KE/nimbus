import { Component } from '@angular/core';
import { ViewController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { VerificationService } from '../../providers/verification/verification';

@Component({
  selector: 'documents-modal',
  templateUrl: 'documents-modal.html'
})
export class DocumentsModalPage {
  documents: any[];
  slideOptions = {
    pager: true,
    loop: true
  };

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public verificationService: VerificationService) {
      this.documents = navParams.get('documents');
  }

  public ionViewDidLoad(): void {
    //Do not use this for modals
  }

  cancel() {
    this.viewCtrl.dismiss(false);
  }

  delete() {
    var loader = this.loadingCtrl.create({});
    loader.present();
    this.verificationService.deleteDocument(this.documents[0].id)
      .map(res => res.json())
      .subscribe(
        data => {
          loader.dismiss();
          this.viewCtrl.dismiss(true);
        },
        errors => {
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Woops',
            subTitle: 'Failed to delete document, please try again!',
            buttons: ['OK']
          });
          alert.present();
        }
      )
  }
}

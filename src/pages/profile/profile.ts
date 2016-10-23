import { Component } from '@angular/core';
import { NavController,
         ToastController,
         ModalController,
         LoadingController,
         AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { CardModalPage } from '../../pages/card-modal/card-modal';
import { AddressModalPage } from '../../pages/address-modal/address-modal';
import { DocumentsPage } from '../../pages/documents/documents';

import { AuthenticationService } from '../../providers/authentication/authentication';
import { ProfileService } from '../../providers/profile/profile';
import { VerificationService } from '../../providers/verification/verification';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  email: string;
  firstName: string;
  lastName: string;
  addresses: any[];
  cards: any[];
  documents: any[];
  file: File;

  constructor(public navCtrl: NavController,
              public auth: AuthenticationService,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public profileService: ProfileService,
              public verificationService: VerificationService) {

    var loader = this.loadingCtrl.create({
    });
    loader.present();
    this.profileService.getUser()
      .map(response => response.json())
      .subscribe(
        data => {
          console.log(data);
          this.email = data.email;
          this.firstName = data.first_name;
          this.lastName = data.last_name;
          this.addresses = data.address ? JSON.parse(data.address) : [];
          this.cards = data.cards;
          this.documents = data.documents;
          loader.dismiss();
        },
        error => {
          console.log(error);
          this.cards = [];
        }
      );

  }

  addAddress() {
    let addressModal = this.modalCtrl.create(AddressModalPage);
    addressModal.present();
    addressModal.onDidDismiss(data => {
      if (data) {
        this.addresses.push(data);
        this.profileService.updateUser({
          address: JSON.stringify(this.addresses)
        });
      }
    });
  }

  addCreditCard() {
    let cardModal = this.modalCtrl.create(CardModalPage);
    cardModal.present();
    cardModal.onDidDismiss(data => {
      if (data.card) {
        this.cards.push(data.card);
        this.profileService.updateUser({
          token: data.id
        });
      }
    });
  }

  addDocument(event, type) {
    var files = event.srcElement.files;
    var filePath = this.email +  '/' + type;
    this.file = files[0];

    var loader = this.loadingCtrl.create({});
    loader.present();

    this.verificationService.saveDocument(this.email, this.file, type)
      .map(res => res.json())
      .subscribe(
        data => {
          loader.dismiss();
          this.documents.push({
            type: type,
            url: "https://s3.amazonaws.com/verification.nimbus.co/" + filePath
          })
        },
        errors => {
          loader.dismiss();
          this.displayAlert('Upload Failed', 'Failed to upload your verification document to our servers. Please try again');
        }
      )
  }

  displayAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  goToDocumentsPage() {
    this.navCtrl.push(DocumentsPage, {
      documents: this.documents
    })
  }

  signOut() {
    this.auth.signOut().subscribe(
      res => {
        let toast = this.toastCtrl.create({
          message: "You have been signed out.",
          duration: 3000
        })
        // toast.present();
        this.navCtrl.push(HomePage);
      },
      error => this.navCtrl.push(HomePage)
    )
  }
}

import { Component } from '@angular/core';
import { NavController,
         ToastController,
         ModalController,
         LoadingController,
         AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AddressModalPage } from '../../pages/address-modal/address-modal';
import { DocumentsPage } from '../../pages/documents/documents';
import { TermsPage } from '../terms/terms';

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
  idDocuments: any[];
  medicalDocuments: any[];
  file: File;

  constructor(public navCtrl: NavController,
              public auth: AuthenticationService,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public profileService: ProfileService,
              public verificationService: VerificationService) {
    this.idDocuments = new Array();
    this.medicalDocuments = new Array();

    var loader = this.loadingCtrl.create({
    });
    loader.present();
    this.profileService.getUser()
      .map(response => response.json())
      .subscribe(
        data => {
          this.email = data.email;
          this.firstName = data.first_name;
          this.lastName = data.last_name;
          this.addresses = data.addresses || []
          this.categorizeDocuments(data.documents);
          loader.dismiss();
        },
        error => {
          loader.dismiss();
        }
      );

  }

  //TODO: There is a lot of duplicate code between this and checkout
  categorizeDocuments(documents: any) {
    for (var document of documents) {
      if(document.type == 'identification') {
        this.idDocuments.push(document);
      } else {
        this.medicalDocuments.push(document);
      }
    }
  }

  addAddress() {
    let addressModal = this.modalCtrl.create(AddressModalPage);
    addressModal.present();
    addressModal.onDidDismiss(data => {
      if (data) {
        var loader = this.loadingCtrl.create({});
        loader.present();
        this.profileService.addAddress(data)
          .map(response => response.json())
          .subscribe(
            data => {
              console.log(data);
              this.addresses.push(data);
              loader.dismiss();
            },
            error => {
              console.log(error);
              loader.dismiss();
              let alert = this.alertCtrl.create({
                title: 'Oh No!',
                subTitle: error == undefined? error.json().errors.full_messages[0] : 'An unknown error occured',
                buttons: ['OK']
              });
              alert.present();
            }
          )
      }
    });
  }


  addDocument(event, type) {
    var files = event.srcElement.files;
    var filePath = this.email +  '/' + type;
    this.file = files[0];

    var loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();

    this.verificationService.saveDocument(this.email, this.file, type)
      .map(res => res.json())
      .subscribe(
        data => {
          loader.dismiss();
          if(type == 'identification') {
            this.idDocuments.push({
              type: type,
              url: "https://s3.amazonaws.com/verification.nimbus.co/" + filePath
            })
          } else {
            this.medicalDocuments.push({
              type: type,
              url: "https://s3.amazonaws.com/verification.nimbus.co/" + filePath
            })
          }
        },
        errors => {
          loader.dismiss();
          if(type == 'identification') {
            this.idDocuments.push({
              type: type,
              url: "https://s3.amazonaws.com/verification.nimbus.co/" + filePath
            })
          } else {
            this.medicalDocuments.push({
              type: type,
              url: "https://s3.amazonaws.com/verification.nimbus.co/" + filePath
            })
          }
          // this.displayAlert('Upload Failed', 'Failed to upload your verification document to our servers. Please try again');
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

  goToIdDocumentsPage() {
    this.navCtrl.push(DocumentsPage, {
      documents: this.idDocuments
    })
  }

  goToMedicalDocumentsPage() {
    this.navCtrl.push(DocumentsPage, {
      documents: this.medicalDocuments
    })
  }

  goToTerms() {
    this.navCtrl.push(TermsPage);
  }

  signOut() {
    this.auth.signOut().subscribe(
      res => {
        this.navCtrl.push(HomePage);
      },
      error => this.navCtrl.push(HomePage)
    )
  }
}

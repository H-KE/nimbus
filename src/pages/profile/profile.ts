import { Component } from '@angular/core';
import { NavController,
         ToastController,
         ModalController,
         LoadingController,
         AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AddressModalPage } from '../../pages/address-modal/address-modal';
import { DocumentsModalPage } from '../../pages/documents-modal/documents-modal';
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
              // console.log(data);
              this.addresses.push(data);
              loader.dismiss();
            },
            error => {
              // console.log(error);
              loader.dismiss();
              let alert = this.alertCtrl.create({
                title: 'Woops',
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

    this.verificationService.postImageToS3(this.file, filePath)
      .subscribe(
        res => {
          this.verificationService.saveDocument(type, filePath)
          .map (res => res.json())
          .subscribe(
            document => {
              loader.dismiss();
              if(type == 'identification') {
                this.idDocuments.push(document);
              } else {
                this.medicalDocuments.push(document);
              }
            },
            error => {
              loader.dismiss();
              this.displayAlert('Woops', 'I was unable to upload your document, please try again!');
            }
          );
        }
      );
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
    let documentsModal = this.modalCtrl.create(DocumentsModalPage, {"documents": this.idDocuments});
    documentsModal.present(documentsModal);
    documentsModal.onDidDismiss(deleted => {
      if(deleted) {
        this.idDocuments = new Array();
      }
    });
  }

  goToMedicalDocumentsPage() {
    let documentsModal = this.modalCtrl.create(DocumentsModalPage, {"documents": this.medicalDocuments});
    documentsModal.present(documentsModal);
    documentsModal.onDidDismiss(deleted => {
      if(deleted) {
        this.medicalDocuments = new Array();
      }
    });
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

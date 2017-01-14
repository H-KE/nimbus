import { Component } from '@angular/core';
import { NavController,
         NavParams,
         ModalController,
         ViewController,
         LoadingController,
         AlertController } from 'ionic-angular';

import { Order } from '../../models/order';
import { OrderDetailsPage } from '../order-details/order-details';
import { DocumentsModalPage } from '../../pages/documents-modal/documents-modal';

import { CartService } from '../../providers/cart/cart';
import { OrderService } from '../../providers/orders/orders';
import { ProfileService } from '../../providers/profile/profile';
import { VerificationService } from '../../providers/verification/verification';

import { AddressModalPage } from '../../pages/address-modal/address-modal';

import _ from 'underscore';


@Component({
  selector: 'checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {
  order: Order;
  user: any;
  selectedAddress: any;
  addressOptions: any;
  selectedText: any;
  file: File;
  paymentMethod: string;
  idDocuments: any[];
  medicalDocuments: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public orderService: OrderService,
              public cartService: CartService,
              public profileService: ProfileService,
              public verificationService: VerificationService,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
  }

  public ionViewDidLoad(): void {
    this.idDocuments = new Array();
    this.medicalDocuments = new Array();

    this.paymentMethod = "etransfer";

    this.order = null;
    this.order = this.navParams.get('order');
    console.log(this.order);

    this.addressOptions = {
      title: 'Select an address'
    }

    this.loadUser();
  };

  loadUser() {
    var loader = this.loadingCtrl.create({});
    loader.present();

    this.profileService.getUser()
      .map(response => response.json())
      .subscribe(
        data => {
          // console.log(data);
          this.user = data;
          this.user.addresses = data.addresses || [];
          this.selectedAddress = this.user.addresses[0];
          this.categorizeDocuments(data.documents);
          loader.dismiss();
        },
        error => {
          // console.log(error);
        }
      );
  }

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
              this.user.addresses.push(data);
              this.selectedAddress = data;
              loader.dismiss();
            },
            error => {
              // console.log(error);
              loader.dismiss();
            }
          )
      }
    });
  }

  placeOrder() {

    if (!this.selectedAddress && !this.order.pickup) {
      let alert = this.alertCtrl.create({
        title: 'No Address!',
        subTitle: 'Please add an address so we know where to ship your order.',
        buttons: ['OK']
      });
      alert.present();

      return;
    }

    if (this.idDocuments.length < 1) {
      let alert = this.alertCtrl.create({
        title: 'Insufficient Verification!',
        subTitle: 'Please upload a picture of your identification (driver license or health card) to verify your age.',
        buttons: ['OK']
      });
      alert.present();

      return;
    }

    if (this.order.medical && this.medicalDocuments.length < 1) {
      let alert = this.alertCtrl.create({
        title: 'Insufficient Verification!',
        subTitle: 'Please upload pictures of your medical documentation.',
        buttons: ['OK']
      });
      alert.present();

      return;
    }


    this.order.address_id =  this.order.pickup? "1" : this.selectedAddress.address_id;
    this.order.distribution_channel = this.order.pickup? "pickup" : "mail";

    // console.log(this.order);


    var loader = this.loadingCtrl.create({});
    loader.present();

    this.orderService.placeOrder(this.order)
      .map( res => res.json())
      .subscribe(
        data => {
          this.cartService.clearCart(this.order.dispensary_name);
          loader.dismiss();
          this.goToOrderDetails(data);
        },
        error => {
          loader.dismiss();
          // console.log(error);
          let alert = this.alertCtrl.create({
            title: 'Woops',
            subTitle: error == undefined? error.json().errors.full_messages[0] : 'An unknown error occured',
            buttons: ['OK']
          });
          alert.present();
        }
      )
  }

  goToOrderDetails(newOrder) {
    this.navCtrl.setRoot(OrderDetailsPage, {
      order: newOrder
    });
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

  displayAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  addDocument(event, type) {
    var files = event.srcElement.files;
    var filePath = this.user.email +  '/' + type;
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

}

import { Component } from '@angular/core';
import { NavController,
         NavParams,
         ModalController,
         ViewController,
         LoadingController,
         AlertController } from 'ionic-angular';

import { Order } from '../../models/order';
import { OrderDetailsPage } from '../order-details/order-details';
import { DocumentsPage } from '../documents/documents';

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
    this.idDocuments = new Array();
    this.medicalDocuments = new Array();

    this.paymentMethod = "etransfer";

    this.order = null;
    this.order = navParams.get('order');
    console.log(this.order);

    this.addressOptions = {
      title: 'Select an address'
    }

    this.loadUser();
  }

  loadUser() {
    var loader = this.loadingCtrl.create({});
    loader.present();

    this.profileService.getUser()
      .map(response => response.json())
      .subscribe(
        data => {
          console.log(data);
          this.user = data;
          this.user.addresses = data.addresses || [];
          this.selectedAddress = this.user.addresses[0];
          this.categorizeDocuments(data.documents);
          loader.dismiss();
        },
        error => {
          console.log(error);
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
              console.log(data);
              this.user.addresses.push(data);
              this.selectedAddress = data;
              loader.dismiss();
            },
            error => {
              console.log(error);
              loader.dismiss();
            }
          )
      }
    });
  }

  placeOrder() {

    if (!this.selectedAddress) {
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

    this.order.address_id = this.selectedAddress.address_id;
    this.order.distribution_channel = "mail";

    console.log(this.order);


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
        errors => console.log(errors)
      )
  }

  goToOrderDetails(newOrder) {
    this.navCtrl.setRoot(OrderDetailsPage, {
      order: newOrder
    });
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

    var loader = this.loadingCtrl.create({});
    loader.present();

    this.verificationService.saveDocument(this.user.email, this.file, type)
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
          // TODO: HACK  -- status 204 resolves to error
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

}

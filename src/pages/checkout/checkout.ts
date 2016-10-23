import { Component } from '@angular/core';
import { NavController,
         NavParams,
         ModalController,
         ViewController,
         LoadingController,
         AlertController } from 'ionic-angular';
import { Http,
         Response,
         Headers,
         Request,
         RequestMethod,
         RequestOptions }   from '@angular/http';

import { Order } from '../../models/order';
import { OrderDetailsPage } from '../order-details/order-details';

import { CartService } from '../../providers/cart/cart';
import { OrderService } from '../../providers/orders/orders';
import { ProfileService } from '../../providers/profile/profile';

import { AddressModalPage } from '../../pages/address-modal/address-modal';
import { CardModalPage } from '../../pages/card-modal/card-modal';


@Component({
  selector: 'checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {
  order: Order;
  totalPrice: number;
  user: any;
  selectedAddress: any;
  selectedCard: any;
  cardOptions: any;
  addressOptions: any;
  selectedText: any;
  dismissModal: boolean;
  file: File;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public orderService: OrderService,
              public cartService: CartService,
              public profileService: ProfileService,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public http: Http) {

    this.order = null;
    this.order = navParams.get('order');

    //TODO: why the fuck cant i do normal addition in typescript. THIS IS FUCKED UP
    this.totalPrice = this.order.total_price * 1 + this.order.delivery_fee * 1;

    this.cardOptions = {
      title: 'Select a card'
    };
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
          this.user.addresses = data.address ? JSON.parse(data.address) : [];
          this.selectedAddress = this.user.addresses[0];
          this.selectedCard = this.user.cards[0];
          loader.dismiss();
        },
        error => {
          console.log(error);
        }
      );
  }

  addAddress() {
    let addressModal = this.modalCtrl.create(AddressModalPage);
    this.dismissModal = false;
    addressModal.present();
    addressModal.onDidDismiss(data => {
      if (data) {
        var loader = this.loadingCtrl.create({});
        loader.present();

        this.user.addresses.push(data);
        this.selectedAddress = data;

        this.profileService.updateUser({
          address: JSON.stringify(this.user.addresses)
        }).then(response => {
          console.log(response);
          loader.dismiss()
        });
      } else {
          this.dismissModal = true;
      }
    });
  }

  addCreditCard() {
    let cardModal = this.modalCtrl.create(CardModalPage);
    this.dismissModal = false;
    cardModal.present();
    cardModal.onDidDismiss(data => {
      if (data.card) {
        var loader = this.loadingCtrl.create({});
        loader.present();

        this.user.cards.push(data.card);
        this.selectedCard = data.card;

        this.profileService.updateUser({
          token: data.id
        }).then(response => {
          console.log(response);
          loader.dismiss()
        });
      } else {
        this.dismissModal = true;
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

    if (!this.selectedCard) {
      let alert = this.alertCtrl.create({
        title: 'No Credit Card!',
        subTitle: 'Please add a credit card so we can fulfill your order.',
        buttons: ['OK']
      });
      alert.present();

      return;
    }

    this.order.address = JSON.stringify(this.selectedAddress);
    this.order.distribution_channel = "mail";

    console.log(this.order);


    var loader = this.loadingCtrl.create({});
    loader.present();

    this.orderService.placeOrder(this.order)
      .map( res => res.json())
      .subscribe(
        data => {
          this.cartService.clearCart(this.order.dispensary_name);
          loader.dismiss()
          this.order.id = data.id;
          this.order.address = data.address;
          this.order.status = data.status;
          this.goToOrderDetails();
        },
        errors => console.log(errors)
      )
  }

  goToOrderDetails() {
    this.navCtrl.setRoot(OrderDetailsPage, {
      order: this.order
    });
  }

  onChange(event, type) {
    var files = event.srcElement.files;
    this.file = files[0];

    let formData: FormData = new FormData();
    let xhr: XMLHttpRequest = new XMLHttpRequest();

    //Build AWS S3 Request
    formData.append('key', this.user.email + "_" + type);
    formData.append('Content-Type','image/jpeg');
    //Put in your access key here
    formData.append('file',this.file);

    var requestOptions = new RequestOptions({
      method: RequestMethod.Post,
      url: 'https://s3.amazonaws.com/verification.nimbus/',
      body: formData
    })

    var loader = this.loadingCtrl.create({});
    loader.present();

    this.http.request(new Request(requestOptions))
      .subscribe(res => {
        loader.dismiss()
      })
  }
}

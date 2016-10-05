import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { CreditCardModalPage } from '../../pages/card-modal/card-modal';
import { AddressModalPage } from '../../pages/address-modal/address-modal';

import { AuthenticationService } from '../../providers/authentication/authentication';
import { ProfileService } from '../../providers/profile/profile';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [ ProfileService ]
})
export class ProfilePage {
  email: string;
  firstName: string;
  lastName: string;
  addresses: any[];
  cards: any[];

  constructor(private navCtrl: NavController,
              private auth: AuthenticationService,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController,
              private profileService: ProfileService) {
    this.getUserProfile();

  }

  getUserProfile() {
    this.profileService.loadUserProfile()
      .map(response => response.json())
      .subscribe(
        data => {
          console.log(data);
          this.email = data.email;
          this.firstName = data.first_name;
          this.lastName = data.last_name;
          this.addresses = data.address ? JSON.parse(data.address) : [];
          this.cards = data.cards;
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
      console.log(data);
      if (data) {
        this.addresses.push(data);
        this.addAddressToUser(JSON.stringify(this.addresses))
        console.log(this.addresses);
      }
    });
  }

  addAddressToUser(address) {
    this.profileService.updateUser({
      address: address
    });
  }

  addCreditCard() {
    let cardModal = this.modalCtrl.create(CreditCardModalPage);
    cardModal.onDidDismiss(data => {
      console.log(data);
      if (data.card) {
        this.cards.push(data.card);
        this.addCreditCardToUser(data);
      }

    });

    cardModal.present();
  }

  addCreditCardToUser(data) {
    this.profileService.updateUser({
      token: data.id
    });
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

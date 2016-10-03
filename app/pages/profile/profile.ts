import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { CreditCardModalPage } from '../../pages/card-modal/card-modal';

import { AuthenticationService } from '../../providers/authentication/authentication';
import { ProfileService } from '../../providers/profile/profile';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [ ProfileService ]
})
export class ProfilePage {
  cards: any[];

  constructor(private navCtrl: NavController,
              private auth: AuthenticationService,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController,
              private profileService: ProfileService) {
    this.profileService.loadUserCards()
      .map(response => response.json())
      .subscribe(
        data => {
          console.log(data);
          this.cards = data;
        },
        error => {
          console.log(error);
          this.cards = [];
        }
      )
  }

  addCreditCard() {
    let cardModal = this.modalCtrl.create(CreditCardModalPage);
    cardModal.onDidDismiss(data => {
      console.log(data);
      if (data.card) {
        this.cards.push(data.card);
        this.addCreditCardToUser(data);
      }
    // let loader = this.loadingCtrl.create({
    //   content: "Placing Order...",
    //   duration: 3000
    // });
    // loader.present();

    });

    cardModal.present();
    // this.addCreditCardToUser({id: "hola"});

  }

  addCreditCardToUser(data) {
    this.profileService.addCreditCardToUser(data.id);
  }

  signOut() {
    this.auth.signOut().subscribe(
      res => {
        let toast = this.toastCtrl.create({
          message: "You have been signed out.",
          duration: 3000
        })
        toast.present();
        this.navCtrl.push(HomePage);
      },
      error => this.navCtrl.push(HomePage)
    )
  }
}

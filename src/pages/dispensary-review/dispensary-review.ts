import {Component} from '@angular/core';
import {NavController,
        NavParams,
        ModalController,
        ToastController,
        LoadingController,
        AlertController} from 'ionic-angular';

import { Item } from '../../models/item';
import { Review } from '../../models/review';
import { Dispensary } from '../../models/dispensary';

import { CartPage } from '../cart/cart';
import { ReviewModalPage } from '../review-modal/review-modal';

import { CartService } from '../../providers/cart/cart';
import { TicketService } from '../../providers/ticket/ticket';


@Component({
  selector: 'dispensary-review',
  templateUrl: 'dispensary-review.html'
})
export class DispensaryReviewPage {
  selectedDispensary: any
  rating: number;
  review_count: number

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public cartService: CartService,
              public ticketService: TicketService) {

  }

  public ionViewDidLoad(): void {
    this.selectedDispensary = this.navParams.data;
    this.review_count = this.selectedDispensary.reviews.length;
    this.rating = this.selectedDispensary.rating / this.review_count
  }

  goToCart() {
    this.navCtrl.push(CartPage)
  }

  addReviewToSelectedDispensary(review) {
    this.selectedDispensary.reviews.push(review);
    this.selectedDispensary.rating = review.rating + Number(this.selectedDispensary.rating);
    this.review_count = this.selectedDispensary.reviews.length;
    this.rating = this.selectedDispensary.rating / this.selectedDispensary.reviews.length;
  }

  writeReview(selectedItem) {
    let reviewModal = this.modalCtrl.create(ReviewModalPage, {"selectedItem": selectedItem, "type": 'RETAILER'});
    reviewModal.present(reviewModal);
    reviewModal.onDidDismiss(review => {
      if (review) {
        var loader = this.loadingCtrl.create({});
        loader.present();
        this.ticketService.sendReview(review)
          .map(response => response.json())
          .subscribe(
            data => {
              this.addReviewToSelectedDispensary(data)
              loader.dismiss();
              let toast = this.toastCtrl.create({
                message: "Thank you " + data.name + ", for helping the community!",
                duration: 3000
              })
              toast.present();
            },
            error => {
              // console.log(error);
              loader.dismiss();
              let alert = this.alertCtrl.create({
                title: 'Woops',
                subTitle: error == undefined? error.json().errors.full_messages[0] : 'Could not submit review, please try again.',
                buttons: ['OK']
              });
              alert.present();
            }
          )
      }
    });
  }
}

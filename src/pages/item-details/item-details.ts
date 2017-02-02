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
import { AuthenticationService } from '../../providers/authentication/authentication'

import _ from 'underscore';
import mixpanel from 'mixpanel-browser';

@Component({
  selector: 'item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: Item;
  itemSpec: string;
  retailer: Dispensary;
  quantity: number;
  quantityLabel: string;
  itemPrice: number;
  quantityRange: number[];
  dynamicSlider: boolean;
  disabled: boolean;
  slideOptions = {
    pager: true,
    loop: true
  };
  rating: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthenticationService,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public cartService: CartService,
              public ticketService: TicketService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = this.navParams.get('item');
    this.itemSpec = this.navParams.get('itemSpec');
    this.retailer = this.navParams.get('dispensary');
    this.selectedItem.retailer_name = this.retailer.name;
    console.log(this.selectedItem)
    this.rating = this.selectedItem.rating / this.selectedItem.reviews.length;

    this.itemPrice = this.selectedItem.prices[0];
    this.quantityLabel = this.selectedItem.price_labels[0];

    this.dynamicSlider = this.selectedItem.prices.length > 1 ? true : false;
    this.quantity = this.dynamicSlider ? 0 : 1;
    this.quantityRange = _.range(1,11);
    this.disabled = this.retailer.bio === "Coming soon" || this.selectedItem.prices == null || this.selectedItem.prices[0] == null;
  }

  public ionViewDidLoad(): void {}

  addToCart(selectedItem, quantity) {
    mixpanel.track("Item added to cart", {
      api: this.auth._options.apiPath,
      user: this.auth._currentAuthData ? this.auth._currentAuthData.uid : 'unregistered',
      item_id: selectedItem.id,
      item_name: selectedItem.name,
      item_price: selectedItem.price,
      item_quantity: selectedItem.quantity
    });

    if (this.dynamicSlider == true) {
      this.cartService.addToCart(this.retailer.name, this.retailer, selectedItem, selectedItem.price_labels[quantity], selectedItem.prices[quantity]);
    } else {
      this.cartService.addToCart(this.retailer.name, this.retailer, selectedItem, quantity, quantity * this.itemPrice);
    }
    this.presentAddToCartToast(selectedItem);
    this.navCtrl.pop();
  }

  goToCart() {
    this.navCtrl.push(CartPage);
  }

  presentAddToCartToast(selectedItem) {
    let toast = this.toastCtrl.create({
      message: selectedItem.name + ' has been added to your cart.',
      duration: 3000,
      showCloseButton: true
    });
    toast.present();
  }

  addReviewToSelectedItem(review) {
    this.selectedItem.reviews.push(review);
    this.selectedItem.rating = review.rating + Number(this.selectedItem.rating);
    this.rating = this.selectedItem.rating / this.selectedItem.reviews.length;
  }

  writeReview(selectedItem) {
    let reviewModal = this.modalCtrl.create(ReviewModalPage, {"selectedItem": selectedItem, "type": 'PRODUCT'});
    reviewModal.present(reviewModal);
    reviewModal.onDidDismiss(review => {
      if (review) {
        var loader = this.loadingCtrl.create({});
        loader.present();
        this.ticketService.sendReview(review)
          .map(response => response.json())
          .subscribe(
            data => {
              this.addReviewToSelectedItem(data)
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

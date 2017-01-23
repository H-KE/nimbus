import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { Review } from '../../models/review';

@Component({
  selector: 'review-modal',
  templateUrl: 'review-modal.html'
})
export class ReviewModalPage {
  review: Review;
  reviewBody: string;
  rating: number;
  selectedItem: number;
  type: string;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams) {
    this.type = navParams.get('type')
    this.selectedItem = navParams.get('selectedItem')
    this.reviewBody = ""
    this.rating = 5
  }

  ionViewDidLoad() {
    //Do not use this for modals
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  submit() {
    this.review = new Review(this.selectedItem, this.reviewBody, this.rating, this.type)
    this.viewCtrl.dismiss(this.review)
  }
}

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
  errorMessage: string;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams) {
    this.type = navParams.get('type')
    this.selectedItem = navParams.get('selectedItem')
    this.reviewBody = ""
    this.rating = 0
    this.errorMessage = ""
  }

  ionViewDidLoad() {
    //Do not use this for modals
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  submit() {
    if(this.reviewBody == "") {
      this.errorMessage = "Cannot submit an empty review."
    } else if(this.rating == 0){
      this.errorMessage = "Please select a rating."
    } else {
      this.review = new Review(this.selectedItem, this.reviewBody, this.rating, this.type)
      this.viewCtrl.dismiss(this.review)
    }
  }
}

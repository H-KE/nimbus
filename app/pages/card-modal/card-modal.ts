import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import { FormBuilder, Control, ControlGroup, Validators, AbstractControl } from '@angular/common';
import { StripeService } from '../../providers/stripe/stripe';

declare var Stripe: any;


@Component({
  templateUrl: 'build/pages/card-modal/card-modal.html'
})
export class CreditCardModalPage {
  cardForm: any;
  cardNumberChanged: boolean;
  cvcChanged: boolean;
  expMonthChanged: boolean;
  expYearChanged: boolean;
  errorMessage: string;

  constructor(private navCtrl: NavController,
              private stripeService: StripeService,
              private formBuilder: FormBuilder,
              private viewController: ViewController) {
    this.cardNumberChanged = false;
    this.cvcChanged = false;
    this.expMonthChanged = false;
    this.expYearChanged = false;

    this.cardForm = formBuilder.group({
      number: ["", Validators.compose([Validators.required, this.checkCreditCardNumber])],
      cvc: ["", Validators.compose([Validators.required, this.checkCVC])],
      exp_month: ["", Validators.required],
      exp_year: ["", Validators.required]
    }, {validator: this.checkExpiryDate('exp_month', 'exp_year')});
  }

  checkCreditCardNumber(control: Control) {
    if (!Stripe.card.validateCardNumber(control.value)) {
      return {checkCreditCardNumber: true}
    }
    else {
      return null;
    }
  }

  checkCVC(control: Control) {
    if (!Stripe.card.validateCVC(control.value)) {
      return {checkCVC: true}
    }
    else {
      return null;
    }
  }

  checkExpiryDate(monthKey, yearKey) {
    return (group: ControlGroup) => {
      let month = group.controls[monthKey];
      let year = group.controls[yearKey];
      if (!Stripe.card.validateExpiry(month.value, year.value)) {
        return year.setErrors({checkExpiryDate: true});
      }
      else {
        return year.setErrors(null);
      }
    }
  }

  submit() {
    this.stripeService.createToken(this.cardForm.value)
      .then(response => {
        if (response['error']) {
          this.errorMessage = response['error'].message;
        }
        else {
          console.log(response);
          this.viewController.dismiss(response);
        }
      })
  }

  dismiss() {
    this.viewController.dismiss("User dimiss");
  }
}

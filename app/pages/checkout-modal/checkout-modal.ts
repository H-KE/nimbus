import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import { FormBuilder, Control, ControlGroup, Validators, AbstractControl } from '@angular/common';
import { StripeService } from '../../providers/stripe/stripe';

declare var Stripe: any;


@Component({
  templateUrl: 'build/pages/checkout-modal/checkout-modal.html'
})
export class CheckoutModalPage {
  cardForm: any;
  cardNumberChanged: boolean;

  constructor(private navCtrl: NavController,
              private stripeService: StripeService,
              private formBuilder: FormBuilder,
              private viewController: ViewController) {
    this.cardNumberChanged = false;

    this.cardForm = formBuilder.group({
      number: ["", Validators.compose([Validators.required, this.checkCreditCardNumber])],
      cvc: ["", Validators.compose([Validators.required, this.checkCVC])],
      exp_month: ["", Validators.required],
      exp_year: ["", Validators.required]
    });
  }

  checkCreditCardNumber(control: Control) {
    if (!Stripe.card.validateCardNumber(control.value)) {
      console.log("valid");
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

  submit() {
    console.log(this.cardForm.value);
    this.stripeService.createToken(this.cardForm.value);
    this.viewController.dismiss("FUCKING WORKS");
  }
}

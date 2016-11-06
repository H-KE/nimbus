import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../../providers/authentication/authentication'

import { User } from '../../models/user'

import { SearchPage } from '../search/search';
import { TermsPage } from '../terms/terms';

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  errorMessage: string;
  signupForm: any;

  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              public auth: AuthenticationService,
              public loadingCtrl: LoadingController) {

    this.signupForm = formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

  }

  signup() {
    var loader = this.loadingCtrl.create({});
    loader.present();
    this.auth.registerAccount(
      this.signupForm.controls.first_name.value,
      this.signupForm.controls.last_name.value,
      this.signupForm.controls.email.value,
      this.signupForm.controls.password.value,
      this.signupForm.controls.password.value)
      .subscribe(
        res => {
          loader.dismiss();
          let toast = this.toastCtrl.create({
            message: "Thank you for signing up, enjoy your Nimbus experience!",
            duration: 3000
          })
          toast.present();
          this.goToSearch();
        },
        error => {
          loader.dismiss();
          this.errorMessage = error.json().errors.full_messages[0];
        }
      )
  }

  goToSearch() {
    this.navCtrl.setRoot(SearchPage);
  }

  goToTerms() {
    this.navCtrl.push(TermsPage);
  }
}

import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../../providers/authentication/authentication'

import { User } from '../../models/user'

import { SearchPage } from '../search/search';

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
              public auth: AuthenticationService) {

    this.signupForm = formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

  }

  signup() {
    this.auth.registerAccount(
      this.signupForm.controls.first_name.value,
      this.signupForm.controls.last_name.value,
      this.signupForm.controls.email.value,
      this.signupForm.controls.password.value,
      this.signupForm.controls.password.value)
      .subscribe(
        res => {
          let toast = this.toastCtrl.create({
            message: "Your account was successfully created!",
            duration: 3000
          })
          toast.present();
          this.goToSearch();
        },
        error => this.errorMessage = error.json().errors.full_messages[0]
      )
  }

  goToSearch() {
    this.navCtrl.setRoot(SearchPage);
  }
}

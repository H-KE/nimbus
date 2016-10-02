import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { SearchPage } from '../search/search';

import { FormBuilder, Control, ControlGroup, Validators, AbstractControl } from '@angular/common';
import { User } from '../../models/user'
import { AuthenticationService } from '../../providers/authentication/authentication'

@Component({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  errorMessage: string;
  signupForm: any;

  constructor(private navCtrl: NavController,
              private formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              private auth: AuthenticationService) {

    this.signupForm = formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

  }

  signup() {
    this.auth.registerAccount(
      this.signupForm.controls.email.value,
      this.signupForm.controls.password.value,
      this.signupForm.controls.password.value)
      .subscribe(
        res => {
          let toast = this.toastCtrl.create({
            message: "Your account was created successfully!",
            duration: 3000
          })
          toast.present();
          this.gotoSearch();
        },
        error => this.errorMessage = error.json().errors.full_messages[0]
      )
  }

  gotoSearch() {
    this.navCtrl.setRoot(SearchPage);
  }
}

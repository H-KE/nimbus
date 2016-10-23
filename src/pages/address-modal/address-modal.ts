import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'address-modal',
  templateUrl: 'address-modal.html'
})
export class AddressModalPage {
  addressForm: any;
  errorMessage: string;

  constructor(public viewCtrl: ViewController,
              public formBuilder: FormBuilder) {

    this.addressForm = formBuilder.group({
      streetAndNumber: ["", Validators.required],
      aptNumber: ["", Validators.required],
      city: ["", Validators.required],
      province: ["", Validators.required],
      postalCode: ["", Validators.required]
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.addressForm.value);
  }

  remove() {
    this.viewCtrl.dismiss();
  }

}

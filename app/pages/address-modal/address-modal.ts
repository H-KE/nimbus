import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormBuilder, Control, ControlGroup, Validators, AbstractControl } from '@angular/common';

@Component({
  templateUrl: 'build/pages/address-modal/address-modal.html',
})
export class AddressModalPage {
  addressForm: any;

  constructor(private viewCtrl: ViewController,
              private formBuilder: FormBuilder) {

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
